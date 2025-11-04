"""
CSS validation tests for restaurant webpage
"""
import pytest
from pathlib import Path
import re
import cssutils


@pytest.mark.css
class TestCSSValidation:
    """Test CSS file structure and validation"""
    
    @pytest.fixture
    def base_path(self):
        """Get base path of project"""
        return Path(__file__).parent.parent
    
    @pytest.fixture
    def css_files(self, base_path):
        """Get all CSS files"""
        css_files = []
        for file in base_path.rglob("*.css"):
            css_files.append(file)
        return css_files
    
    def test_css_files_exist(self, css_files):
        """Test that CSS files exist"""
        assert len(css_files) > 0, "No CSS files found"
    
    def test_styles_css_exists(self, base_path):
        """Test that styles.css exists"""
        styles_file = base_path / "styles.css"
        assert styles_file.exists(), "styles.css not found"
    
    def test_css_syntax_valid(self, css_files):
        """Test CSS syntax validity"""
        cssutils.log.setLevel('ERROR')  # Suppress warnings
        
        for css_file in css_files:
            with open(css_file, 'r', encoding='utf-8') as f:
                css_content = f.read()
                
                try:
                    # Parse CSS
                    sheet = cssutils.parseString(css_content)
                    # If parsing succeeds, syntax is valid
                    assert True
                except Exception as e:
                    pytest.fail(f"{css_file.name} has CSS syntax errors: {str(e)}")
    
    def test_css_has_responsive_design(self, base_path):
        """Test that CSS has responsive design (media queries)"""
        styles_file = base_path / "styles.css"
        with open(styles_file, 'r', encoding='utf-8') as f:
            css_content = f.read()
            
            # Check for media queries
            media_query_pattern = r'@media\s*\([^)]+\)'
            has_media_queries = bool(re.search(media_query_pattern, css_content))
            
            assert has_media_queries, "styles.css missing responsive media queries"
    
    def test_css_has_key_selectors(self, base_path):
        """Test that CSS has key selectors for the application"""
        styles_file = base_path / "styles.css"
        with open(styles_file, 'r', encoding='utf-8') as f:
            css_content = f.read()
            
            # Check for key selectors
            key_selectors = [
                '.menu-item',
                '.cart-sidebar',
                '.header',
                '.container'
            ]
            
            missing_selectors = []
            for selector in key_selectors:
                # Escape special characters for regex
                escaped_selector = re.escape(selector)
                if not re.search(rf'{escaped_selector}\s*{{', css_content):
                    missing_selectors.append(selector)
            
            assert len(missing_selectors) == 0, \
                f"Missing CSS selectors: {', '.join(missing_selectors)}"

