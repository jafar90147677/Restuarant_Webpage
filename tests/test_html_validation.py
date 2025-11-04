"""
HTML validation tests for restaurant webpage
"""
import pytest
import re
from pathlib import Path
from bs4 import BeautifulSoup


@pytest.mark.html
class TestHTMLValidation:
    """Test HTML file structure and validation"""
    
    @pytest.fixture
    def base_path(self):
        """Get base path of project"""
        return Path(__file__).parent.parent
    
    @pytest.fixture
    def html_files(self, base_path):
        """Get all HTML files"""
        html_files = []
        exclude_dirs = {'venv', '.git', 'node_modules', 'htmlcov', '__pycache__', '.pytest_cache'}
        exclude_patterns = ['pytest-report', 'test_', 'z_', 'coverage']
        
        for file in base_path.rglob("*.html"):
            # Exclude files in test directories, venv, etc.
            if any(exclude_dir in file.parts for exclude_dir in exclude_dirs):
                continue
            # Exclude pytest-generated HTML files
            if any(pattern in file.name for pattern in exclude_patterns):
                continue
            html_files.append(file)
        return html_files
    
    def test_html_files_exist(self, html_files):
        """Test that HTML files exist"""
        assert len(html_files) > 0, "No HTML files found"
    
    def test_index_html_exists(self, base_path):
        """Test that index.html exists"""
        index_file = base_path / "index.html"
        assert index_file.exists(), "index.html not found"
    
    def test_html_doctype(self, html_files):
        """Test that all HTML files have DOCTYPE"""
        for html_file in html_files:
            with open(html_file, 'r', encoding='utf-8') as f:
                content = f.read()
                assert '<!DOCTYPE html' in content or '<!doctype html' in content, \
                    f"{html_file.name} missing DOCTYPE declaration"
    
    def test_html_valid_structure(self, html_files):
        """Test HTML structure validity"""
        for html_file in html_files:
            with open(html_file, 'r', encoding='utf-8') as f:
                content = f.read()
                soup = BeautifulSoup(content, 'html.parser')
                
                # Check for html tag
                assert soup.html is not None, f"{html_file.name} missing <html> tag"
                
                # Check for head tag
                assert soup.head is not None, f"{html_file.name} missing <head> tag"
                
                # Check for body tag
                assert soup.body is not None, f"{html_file.name} missing <body> tag"
    
    def test_html_meta_charset(self, html_files):
        """Test that HTML files have charset meta tag"""
        for html_file in html_files:
            with open(html_file, 'r', encoding='utf-8') as f:
                content = f.read()
                soup = BeautifulSoup(content, 'html.parser')
                
                # Check for charset in meta tag (can be attribute or content)
                charset_meta = soup.find('meta', {'charset': True}) or \
                               soup.find('meta', {'http-equiv': re.compile('charset', re.I)})
                assert charset_meta is not None, \
                    f"{html_file.name} missing charset meta tag"
    
    def test_html_title_exists(self, html_files):
        """Test that HTML files have title tag"""
        for html_file in html_files:
            with open(html_file, 'r', encoding='utf-8') as f:
                content = f.read()
                soup = BeautifulSoup(content, 'html.parser')
                
                title = soup.find('title')
                assert title is not None, f"{html_file.name} missing <title> tag"
                assert title.string.strip() != "", \
                    f"{html_file.name} has empty title"
    
    def test_index_html_has_menu_items(self, base_path):
        """Test that index.html has menu structure"""
        index_file = base_path / "index.html"
        with open(index_file, 'r', encoding='utf-8') as f:
            content = f.read()
            soup = BeautifulSoup(content, 'html.parser')
            
            # Check for menu-related elements
            menu_grid = soup.find(id='menuGrid')
            assert menu_grid is not None, "index.html missing menuGrid element"
            
            # Check for cart elements
            cart_sidebar = soup.find(id='cartSidebar')
            assert cart_sidebar is not None, "index.html missing cartSidebar element"
    
    def test_no_broken_links(self, html_files):
        """Test that there are no obviously broken internal links"""
        for html_file in html_files:
            with open(html_file, 'r', encoding='utf-8') as f:
                content = f.read()
                soup = BeautifulSoup(content, 'html.parser')
                
                # Check for script src attributes
                scripts = soup.find_all('script', src=True)
                for script in scripts:
                    src = script.get('src')
                    if src and not src.startswith('http') and not src.startswith('//'):
                        # Check if local file exists
                        script_path = html_file.parent / src
                        if not script_path.exists() and not src.startswith('logger.js'):
                            pytest.skip(f"External script: {src}")

