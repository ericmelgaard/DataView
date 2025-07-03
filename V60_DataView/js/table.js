//

function toggleTable(header) {
    const table = header.nextElementSibling;
    const icon = header.querySelector('.expand-icon');
    if (table.style.display === 'none' || !table.style.display) {
        table.style.display = 'table';
        icon.innerHTML = 'expand_less';
        header.style.borderRadius = "10px 10px 0px 0px";
    } else {
        table.style.display = 'none';
        icon.innerHTML = 'expand_more';
        header.style.borderRadius = "10px 10px 10px 10px";
    }
}

function downloadCSV(event, tableData, fileName) {
    event.stopPropagation(); // Prevent the click from toggling the content
    objectExporter({
        exportable: tableData,
        type: 'csv',
        fileName: fileName
    });
}

function filterTable(input, columnIndex, tableId) {
    const table = document.getElementById(tableId);
    const tbody = table.querySelector('tbody');
    const rows = tbody.querySelectorAll('tr');
    const filterValue = input.value.toLowerCase();

    rows.forEach(row => {
        const cell = row.cells[columnIndex];
        if (cell) {
            const cellText = cell.textContent.toLowerCase();
            const shouldShow = cellText.includes(filterValue);
            row.style.display = shouldShow ? '' : 'none';
        }
    });

    // Update row count
    const visibleRows = Array.from(rows).filter(row => row.style.display !== 'none');
    updateRowCount(tableId, visibleRows.length, rows.length);
}

function clearAllFilters(tableId) {
    const table = document.getElementById(tableId);
    const filterInputs = table.querySelectorAll('.column-filter');
    const tbody = table.querySelector('tbody');
    const rows = tbody.querySelectorAll('tr');

    // Clear all filter inputs
    filterInputs.forEach(input => {
        input.value = '';
    });

    // Show all rows
    rows.forEach(row => {
        row.style.display = '';
    });

    // Update row count
    updateRowCount(tableId, rows.length, rows.length);
}

function updateRowCount(tableId, visibleCount, totalCount) {
    const table = document.getElementById(tableId);
    const container = table.closest('.table-container');
    let countElement = container.querySelector('.row-count');
    
    if (!countElement) {
        countElement = document.createElement('div');
        countElement.className = 'row-count';
        const header = container.querySelector('.header');
        header.appendChild(countElement);
    }
    
    countElement.textContent = `${visibleCount} of ${totalCount} rows`;
}

var IMSintegration;
(function (wandDigital) {
    var tableBuilder = (function () {
        function tableBuilder() {
            this.integrationItems;
            this.integrationModifiers;
            this.IMSProducts;
            this.formattedItems = [];
            this.tableCounter = 0;
        }
        tableBuilder.prototype.init = function (integrationItems, integrationModifiers, integrationDiscounts, IMSProducts, IMSItems, API) {
            if (!API) {
                return;
            }
            this.integrationItems = integrationItems;
            this.integrationModifiers = integrationModifiers;
            this.IMSProducts = IMSProducts;
            this.clearTableContainers(".table-container");
            this.build(integrationItems, API, "integrationItems", "Items");
            this.build(integrationModifiers, API, "integrationModifiers", "Modifiers");
//            this.build(integrationDiscounts, API, "integrationDiscounts", "Discounts");
            if (IMSProducts) {
                this.build(IMSProducts, API, "IMSProducts", "Products");
            }
            if (IMSItems) {
//                this.build(IMSItems, API, "IMSItems", "Menu Items");
            }
        };

        tableBuilder.prototype.build = function (tables, API, tableData, nameDesciption) {
            var _this = this;
            if (!tables || tables.length === 0) {
                return;
            }
            if (tableData.indexOf("IMS") > -1) {
                API = "IMS"
            }

            // Generate unique table ID
            const tableId = `table_${API}_${tableData}_${this.tableCounter++}`;

            //set up data object
            var tableProperties = {};
            tableProperties.API = API;
            tableProperties.data = tableData;
            tableProperties.displayName = tableData.indexOf("IMS") > -1 ? "IMS" + " " + nameDesciption : (API).toUpperCase() + " " + nameDesciption;
            tableProperties.APIContext = tableData.indexOf("IMS") > -1 ? "WAND Digital" + " / " + "Site:" + integration.store : "Brand: " + (integration.brand).toUpperCase() + " / " + "Establiment: " + integration.establishment;
            tableProperties.tableData = tableData;
            tableProperties.tableId = tableId;

            //format APIs
            formattedTable = [];
            if (API.toLowerCase() === "par") {
                tables.forEach(function (each, idx) {
                    each.name = each.name.replaceAll(",", "/");
                    var item = {
                        "name": each.name,
                        "price": each.price,
                        "mappingId": each.mappingId,
                        "active": each.active
                    }
                    formattedTable.push(item)
                })
            }
            if (API.toLowerCase() === "qu") {
                tables.forEach(function (each, idx) {
                    each.name = each.name.replaceAll(",", "/");
                    var item = {
                        "name": each.name,
                        "price": each.price,
                        "mappingId": each.mappingId,
                        "category": each.category,
                    }
                    formattedTable.push(item)
                })
            }
            if (API.toLowerCase() === "ims" && tableData.indexOf("Products") > -1) {
                tables.forEach(function (each, idx) {
                    if(!each.active){return}
                    //custome stop for product name
                    each.name = each.productName ? each.productName.replaceAll(",", "/") : each.category + " " + each.modifierName;
                    var item = {
                        "name": each.name,
                        "price": each.price,
                        "calories": each.calorie,
                        "enabled": each.enabled,
                        "ID": each.productId,
                        "mappingId": each.IMSmappingId,
                        "APISynced": each.ApiSynced

                    }
                    formattedTable.push(item)
                })
            }
            if (API.toLowerCase() === "ims" && tableData.indexOf("Items") > -1) {
                tables.forEach(function (each, idx) {
                    each.name = each.productName.replaceAll(",", "/");
                    var item = {
                        "Name": each.productName,
                        "Brand Menu": each.brandMenuName,
                        "Menu": each.menuName,
                        "Engaged": each.engaged,
                        "Brand": each.brandName,

                    }
                    formattedTable.push(item)
                })
            }
            if (API.toLowerCase() === "toast") {
                tables.forEach(function (each, idx) {
                    each.name = each.name.replaceAll(",", "/");
                    var item = {
                        "name": each.name,
                        "price": each.price,
                        "mappingId": each.mappingId,
                        "description": each.description,
                        "active": each.active
                    }
                    formattedTable.push(item)
                })
            }
            if (API.toLowerCase() === "shift4") {
                tables.forEach(function (each, idx) {
                    each.name = each.name.replaceAll(",", "/");
                    var item = {
                        "name": each.fullName ? each.fullName : each.name,
                        "price": each.price,
                        "mappingId": each.mappingId,
                        "category": each.category,
                        "active": each.active
                    }
                    formattedTable.push(item)
                })
                formattedTable.sort((a, b) => a.name.localeCompare(b.name));
                formattedTable.sort((a, b) => a.category.localeCompare(b.category));

            }
            if (API.toLowerCase() === "revel") {
                tables.forEach(function (each, idx) {
                    each.name = each.name.replaceAll(",", "/");
                    var item = {
                        "name": each.name,
                        "price": each.price,
                        "mappingId": each.mappingId,
                        "category": each.category,
                        "active": each.active
                    }
                    formattedTable.push(item)
                })
            }
            if (API.toLowerCase() === "simphony") {
                tables.forEach(function (each, idx) {
                    each.name = each.name.replaceAll(",", "/");
                    var item = {
                        "name": each.name,
                        "price": each.price,
                        "mappingId": each.mappingId,
                        "category": each.category,
                        "active": each.active
                    }
                    formattedTable.push(item)
                })
            }
            if (API.toLowerCase() === "webtrition") {
                tableProperties.APIContext = "SAP: " + (integration.brand).toUpperCase() + " / " + "Venue: " + integration.establishment;
                tables.forEach(function (each, idx) {
                    each.name = each.name.replaceAll(",", "/");
                    var item = {
                        "name": each.name,
                        "mealStation": each.mealStation,
                        "mealPeriod": each.mealPeriod,
                        "mappingId": each.mappingId,
                        "date": each.date
                    }
                    formattedTable.push(item)
                })

                console.log(formattedTable)
            }

            tables = formattedTable.length > 0 ? formattedTable : tables;
            _this.formattedItems[API + "_" + tableData] = tables;
            
            // Display data in HTML table
            const table = document.createElement('table');
            table.id = tableId;
            const thead = document.createElement('thead');
            const tbody = document.createElement('tbody');

            // Add header row
            const headerRow = document.createElement('tr');
            const filterRow = document.createElement('tr');
            filterRow.className = 'filter-row';
            
            const keys = Object.keys(tables[0]);
            keys.forEach((key, colIdx) => {
                // Header cell
                const th = document.createElement('th');
                th.textContent = key;
                th.style.cursor = 'pointer';
                th.addEventListener('click', function() {
                    // Get current sort direction
                    let dir = th.getAttribute('data-sort-dir') || 'asc';
                    // Remove sort indicators from all headers
                    headerRow.querySelectorAll('th').forEach(h => h.textContent = h.textContent.replace(/ ↑| ↓/, ''));
                    // Sort rows
                    const sorted = [...tables].sort((a, b) => {
                        if (a[key] == null) return 1;
                        if (b[key] == null) return -1;
                        if (typeof a[key] === 'number' && typeof b[key] === 'number') {
                            return dir === 'asc' ? a[key] - b[key] : b[key] - a[key];
                        }
                        return dir === 'asc'
                            ? String(a[key]).localeCompare(String(b[key]))
                            : String(b[key]).localeCompare(String(a[key]));
                    });
                    // Toggle direction
                    dir = dir === 'asc' ? 'desc' : 'asc';
                    th.setAttribute('data-sort-dir', dir);
                    th.textContent = key + (dir === 'asc' ? ' ↑' : ' ↓');
                    // Re-render tbody
                    tbody.innerHTML = '';
                    sorted.forEach(row => {
                        const tr = document.createElement('tr');
                        keys.forEach(k => {
                            const td = document.createElement('td');
                            td.textContent = row[k];
                            tr.appendChild(td);
                        });
                        tbody.appendChild(tr);
                    });
                    // Re-apply filters after sorting
                    const filterInputs = table.querySelectorAll('.column-filter');
                    filterInputs.forEach((input, index) => {
                        if (input.value) {
                            filterTable(input, index, tableId);
                        }
                    });
                });
                headerRow.appendChild(th);

                // Filter cell
                const filterTh = document.createElement('th');
                const filterInput = document.createElement('input');
                filterInput.type = 'text';
                filterInput.className = 'column-filter';
                filterInput.placeholder = `Filter ${key}...`;
                filterInput.addEventListener('input', function() {
                    filterTable(this, colIdx, tableId);
                });
                filterTh.appendChild(filterInput);
                filterRow.appendChild(filterTh);
            });
            
            thead.appendChild(headerRow);
            thead.appendChild(filterRow);

            // Add data rows
            tables.forEach(row => {
                const tr = document.createElement('tr');
                keys.forEach(key => {
                    const td = document.createElement('td');
                    td.textContent = row[key];
                    tr.appendChild(td);
                });
                tbody.appendChild(tr);
            });

            table.appendChild(thead);
            table.appendChild(tbody);
            
            var Table = Mustache.to_html(tableBuilder.TableTemplate, tableProperties);
            $("body").append(Table);
            $(".table-container." + API + "[data-table-id='" + tableId + "']").append(table);
            
            // Initialize row count
            updateRowCount(tableId, tables.length, tables.length);
        };

        tableBuilder.prototype.clearTableContainers = function (zone) {
            var containers = $(zone).get();
            containers.forEach(function (container) {
                container.remove();
            });
        };

        tableBuilder.TableTemplate = `	
	<div class="table-container {{API}}" data-table-id="{{tableId}}">
		<div class="header" onclick="toggleTable(this)">
			<div class="title-header">
				<img class="header-img-{{API}}" src="resources/{{API}}.png">
				<div class="header-text">
					<span class="title">{{displayName}}</span>
					<span class="sub-title">{{APIContext}}</span>
				</div>
			</div>
			<div class="icons">
				<button class="clear-filters-btn" onclick="event.stopPropagation(); clearAllFilters('{{tableId}}')">
					<span class="material-icons">clear_all</span> <span class="button-text">Clear Filters</span>
				</button>
				<button class="download-btn" onclick="downloadCSV(event, tableBuilder.formattedItems.{{API}}_{{tableData}}, '{{displayName}}_{{APIContext}}')">
					<span class="material-icons">download</span> <span class="button-text">Download CSV</span>
				</button>
				<span class="material-icons expand-icon">expand_more</span>
			</div>
		</div>
	</div>`

        return tableBuilder;
    })();
    IMSintegration.tableBuilder = tableBuilder;
})(IMSintegration || (IMSintegration = {}));