// Minimal wandLib.js for demo purposes
function currentTime() {
    return new Date().toISOString().split('T')[0];
}

function setupOptionsMenu() {
    // Create options menu HTML
    var optionsHTML = `
        <div class="options-container" id="optionsContainer">
            <div class="options-button" onclick="toggleOptionsMenu()">
                <span class="material-icons options-icon">settings</span>
            </div>
            <div class="options-dropdown" id="optionsDropdown">
                <div class="dropdown-item" onclick="refreshData()">
                    <span class="material-icons">refresh</span>
                    <span>Refresh Data</span>
                </div>
                <div class="dropdown-item" onclick="clearCache()">
                    <span class="material-icons">clear_all</span>
                    <span>Clear Cache</span>
                </div>
            </div>
        </div>
    `;
    
    $('body').append(optionsHTML);
}

function toggleOptionsMenu() {
    var dropdown = document.getElementById('optionsDropdown');
    dropdown.classList.toggle('show');
}

function refreshData() {
    location.reload();
}

function clearCache() {
    localStorage.clear();
    location.reload();
}

function animateObserver() {
    // Placeholder for animation observer
}

function rotateAsset(selector, degrees) {
    $(selector).css('transform', 'rotate(' + degrees + 'deg)');
}

// Object exporter for CSV downloads
function objectExporter(options) {
    var data = options.exportable;
    var filename = options.fileName || 'export';
    var type = options.type || 'csv';
    
    if (type === 'csv') {
        var csv = convertToCSV(data);
        downloadCSV(csv, filename + '.csv');
    }
}

function convertToCSV(data) {
    if (!data || data.length === 0) return '';
    
    var headers = Object.keys(data[0]);
    var csvContent = headers.join(',') + '\n';
    
    data.forEach(function(row) {
        var values = headers.map(function(header) {
            var value = row[header];
            // Escape commas and quotes
            if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
                value = '"' + value.replace(/"/g, '""') + '"';
            }
            return value;
        });
        csvContent += values.join(',') + '\n';
    });
    
    return csvContent;
}

function downloadCSV(csv, filename) {
    var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    var link = document.createElement('a');
    var url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// String similarity function
var stringSimilarity = {
    compareTwoStrings: function(str1, str2) {
        if (!str1 || !str2) return 0;
        if (str1 === str2) return 1;
        
        var longer = str1.length > str2.length ? str1 : str2;
        var shorter = str1.length > str2.length ? str2 : str1;
        
        if (longer.length === 0) return 1.0;
        
        var editDistance = this.levenshteinDistance(longer, shorter);
        return (longer.length - editDistance) / longer.length;
    },
    
    levenshteinDistance: function(str1, str2) {
        var matrix = [];
        
        for (var i = 0; i <= str2.length; i++) {
            matrix[i] = [i];
        }
        
        for (var j = 0; j <= str1.length; j++) {
            matrix[0][j] = j;
        }
        
        for (i = 1; i <= str2.length; i++) {
            for (j = 1; j <= str1.length; j++) {
                if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j - 1] + 1,
                        matrix[i][j - 1] + 1,
                        matrix[i - 1][j] + 1
                    );
                }
            }
        }
        
        return matrix[str2.length][str1.length];
    }
};