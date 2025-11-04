"""
Integration tests for restaurant webpage
"""
import pytest
from pathlib import Path


@pytest.mark.integration
class TestIntegration:
    """Integration tests for the complete application"""
    
    @pytest.fixture
    def base_path(self):
        """Get base path of project"""
        return Path(__file__).parent.parent
    
    def test_all_core_files_exist(self, base_path):
        """Test that all core files exist"""
        required_files = [
            'index.html',
            'styles.css',
            'script.js',
            'logger.js'
        ]
        
        missing_files = []
        for file in required_files:
            file_path = base_path / file
            if not file_path.exists():
                missing_files.append(file)
        
        assert len(missing_files) == 0, \
            f"Missing required files: {', '.join(missing_files)}"
    
    def test_html_css_js_linked(self, base_path):
        """Test that HTML properly links to CSS and JS"""
        index_file = base_path / "index.html"
        with open(index_file, 'r', encoding='utf-8') as f:
            html_content = f.read()
            
            # Check for CSS link
            assert 'styles.css' in html_content, \
                "index.html missing link to styles.css"
            
            # Check for JS script
            assert 'script.js' in html_content, \
                "index.html missing link to script.js"
            
            # Check for logger.js
            assert 'logger.js' in html_content, \
                "index.html missing link to logger.js"
    
    def test_file_sizes_reasonable(self, base_path):
        """Test that file sizes are reasonable"""
        files_to_check = {
            'index.html': 50 * 1024,  # 50KB max
            'styles.css': 100 * 1024,  # 100KB max
            'script.js': 200 * 1024,   # 200KB max
            'logger.js': 50 * 1024     # 50KB max
        }
        
        oversized_files = []
        for file, max_size in files_to_check.items():
            file_path = base_path / file
            if file_path.exists():
                actual_size = file_path.stat().st_size
                if actual_size > max_size:
                    oversized_files.append(f"{file} ({actual_size} bytes > {max_size} bytes)")
        
        if oversized_files:
            pytest.warns(UserWarning, 
                f"Files exceed recommended size: {', '.join(oversized_files)}")
    
    def test_no_absolute_paths(self, base_path):
        """Test that there are no absolute paths in files"""
        files_to_check = ['index.html', 'script.js']
        
        for file in files_to_check:
            file_path = base_path / file
            if file_path.exists():
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                    
                    # Check for absolute paths (Windows)
                    if 'C:\\' in content or 'C:/' in content:
                        pytest.warns(UserWarning, 
                            f"{file} contains absolute Windows paths")
                    
                    # Check for absolute paths (Unix)
                    if content.startswith('/') and '/home/' in content:
                        pytest.warns(UserWarning, 
                            f"{file} contains absolute Unix paths")

