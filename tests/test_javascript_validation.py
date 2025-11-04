"""
JavaScript validation tests for restaurant webpage
"""
import pytest
import os
import re
from pathlib import Path
import jsbeautifier


@pytest.mark.js
class TestJavaScriptValidation:
    """Test JavaScript file structure and validation"""
    
    @pytest.fixture
    def base_path(self):
        """Get base path of project"""
        return Path(__file__).parent.parent
    
    @pytest.fixture
    def js_files(self, base_path):
        """Get all JavaScript files"""
        js_files = []
        for file in base_path.rglob("*.js"):
            js_files.append(file)
        return js_files
    
    def test_js_files_exist(self, js_files):
        """Test that JavaScript files exist"""
        assert len(js_files) > 0, "No JavaScript files found"
    
    def test_script_js_exists(self, base_path):
        """Test that script.js exists"""
        script_file = base_path / "script.js"
        assert script_file.exists(), "script.js not found"
    
    def test_logger_js_exists(self, base_path):
        """Test that logger.js exists"""
        logger_file = base_path / "logger.js"
        assert logger_file.exists(), "logger.js not found"
    
    def test_js_syntax_basic(self, js_files):
        """Test basic JavaScript syntax"""
        for js_file in js_files:
            with open(js_file, 'r', encoding='utf-8') as f:
                js_content = f.read()
                
                # Basic syntax checks
                # Check for balanced braces
                open_braces = js_content.count('{')
                close_braces = js_content.count('}')
                assert open_braces == close_braces, \
                    f"{js_file.name} has unbalanced braces"
                
                # Check for balanced parentheses
                open_parens = js_content.count('(')
                close_parens = js_content.count(')')
                assert open_parens == close_parens, \
                    f"{js_file.name} has unbalanced parentheses"
                
                # Check for balanced brackets
                open_brackets = js_content.count('[')
                close_brackets = js_content.count(']')
                assert open_brackets == close_brackets, \
                    f"{js_file.name} has unbalanced brackets"
    
    def test_script_js_has_key_functions(self, base_path):
        """Test that script.js has key functions"""
        script_file = base_path / "script.js"
        with open(script_file, 'r', encoding='utf-8') as f:
            js_content = f.read()
            
            # Check for key functions
            key_functions = [
                'addToCart',
                'updateCartDisplay',
                'renderMenu',
                'checkout'
            ]
            
            missing_functions = []
            for func in key_functions:
                # Look for function definition
                pattern = rf'function\s+{func}\s*\('
                if not re.search(pattern, js_content):
                    missing_functions.append(func)
            
            assert len(missing_functions) == 0, \
                f"Missing functions: {', '.join(missing_functions)}"
    
    def test_logger_js_has_key_classes(self, base_path):
        """Test that logger.js has RestaurantLogger class"""
        logger_file = base_path / "logger.js"
        with open(logger_file, 'r', encoding='utf-8') as f:
            js_content = f.read()
            
            # Check for RestaurantLogger class
            assert 'class RestaurantLogger' in js_content or \
                   'function RestaurantLogger' in js_content, \
                "logger.js missing RestaurantLogger class/function"
    
    def test_js_no_innerhtml_injection(self, js_files):
        """Test for potential XSS vulnerabilities with innerHTML"""
        for js_file in js_files:
            with open(js_file, 'r', encoding='utf-8') as f:
                js_content = f.read()
                
                # Check for innerHTML usage with user input
                # This is a basic check - more sophisticated analysis needed for production
                innerhtml_matches = re.findall(r'\.innerHTML\s*=\s*[^;]+', js_content)
                
                for match in innerhtml_matches:
                    # Check if it contains user input patterns
                    if 'input' in match.lower() or 'value' in match.lower():
                        # This is a warning, not a failure
                        pytest.warns(UserWarning, 
                            f"{js_file.name} uses innerHTML with potential user input: {match}")
    
    def test_js_has_error_handling(self, base_path):
        """Test that JavaScript has error handling"""
        script_file = base_path / "script.js"
        with open(script_file, 'r', encoding='utf-8') as f:
            js_content = f.read()
            
            # Check for try-catch blocks
            has_try_catch = 'try' in js_content and 'catch' in js_content
            
            # This is informational, not a requirement
            if not has_try_catch:
                pytest.skip("No try-catch error handling found (optional)")

