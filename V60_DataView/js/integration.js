//Publisher: Wand Digital
//Date: 05.30.2025
//Version: 60.0

var IMSintegration;
(function (wandDigital) {
    var Integration = (function () {
        function Integration(isLeader, isUsingIndexedDB) {
            this.isLeader = isLeader;
            this.isUsingIndexedDB = isUsingIndexedDB;
            this.db = null;
            this.store = Store_Key || "7080";
            this.brand = Brand || "crackerbarrel";
            this.establishment = Establishment || "9998";
            this.API = Partner_API || "simphony";
            
            console.log("Integration initialized");
            this.init();
        }
        
        Integration.prototype.init = function () {
            var _this = this;
            
            // Generate sample data for demonstration
            _this.generateSampleData();
            
            if (_this.isLeader) {
                app.db = _this.db;
                app.store = _this.store;
                app.init(_this.API, false);
            }
        };
        
        Integration.prototype.generateSampleData = function () {
            var _this = this;
            
            // Sample integration items
            var sampleIntegrationItems = [
                { name: "Cheeseburger", price: "12.99", mappingId: "1001", category: "Burgers", active: true },
                { name: "Chicken Sandwich", price: "11.49", mappingId: "1002", category: "Sandwiches", active: true },
                { name: "Caesar Salad", price: "9.99", mappingId: "1003", category: "Salads", active: true },
                { name: "French Fries", price: "4.99", mappingId: "1004", category: "Sides", active: true },
                { name: "Chocolate Cake", price: "6.99", mappingId: "1005", category: "Desserts", active: false }
            ];
            
            var sampleIntegrationModifiers = [
                { name: "Extra Cheese", price: "1.50", mappingId: "2001", category: "Add-ons", active: true },
                { name: "Bacon", price: "2.00", mappingId: "2002", category: "Add-ons", active: true },
                { name: "Avocado", price: "1.75", mappingId: "2003", category: "Add-ons", active: true }
            ];
            
            var sampleIMSProducts = [
                { 
                    productId: "P001", 
                    productName: "Cheeseburger Deluxe", 
                    price: "12.99", 
                    calorie: "650",
                    enabled: true,
                    active: true,
                    outOfStock: false,
                    IMSmappingId: "1001",
                    ApiSynced: true,
                    ApiSource: _this.API
                },
                { 
                    productId: "P002", 
                    productName: "Grilled Chicken", 
                    price: "11.49", 
                    calorie: "420",
                    enabled: true,
                    active: true,
                    outOfStock: false,
                    IMSmappingId: "1002",
                    ApiSynced: true,
                    ApiSource: _this.API
                }
            ];
            
            // Store in localStorage
            if (typeof(Storage) !== "undefined") {
                localStorage.setItem(_this.store + "_integration_products(" + version + ")", JSON.stringify(sampleIntegrationItems));
                localStorage.setItem(_this.store + "_integration_modifiers(" + version + ")", JSON.stringify(sampleIntegrationModifiers));
                localStorage.setItem(_this.store + "_IMS_products(" + version + ")", JSON.stringify(sampleIMSProducts));
                localStorage.setItem(_this.store + "_IMS_settings(" + version + ")", JSON.stringify([]));
                localStorage.setItem(_this.store + "_IMS_menuItems(" + version + ")", JSON.stringify([]));
                localStorage.setItem(_this.store + "_integration_discounts(" + version + ")", JSON.stringify([]));
            }
        };
        
        Integration.prototype.new_leader = function () {
            this.init();
        };
        
        Integration.prototype.setUpdatedDate = function (type) {
            // placeholder
        };
        
        return Integration;
    })();
    IMSintegration.Integration = Integration;
})(IMSintegration || (IMSintegration = {}));