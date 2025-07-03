//Publisher: Wand Digital
//Date: 05.30.2025
//Version: 60.0
var IMSintegration;
(function (wandDigital) {
    var App = (function () {
        function App() {
            this.db = null;
            this.store = "";
            this.API = "";
            this.settingsUpdate = false;
            this.integrationUpdate = false;
            this.IMSUpdate = false;
            this.fullStart = false;
            this.observerInstance = null;
            this.dayWatcher = null;
        }
        App.prototype.init = function (API, fullStart) {
            var _this = this;
            if (!_this.observerInstance) {
                _this.observerInstance = _this.observer();
            }
            _this.API = API;
            _this.fullStart = fullStart;
            if (fullStart) {
                return;
            }
            _this.readDatabase();
        };
        App.prototype.getAPI = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                function retry() {
                    var API = self.localStorage.getItem(_this.store + "_store_context" + "(" + version + ")") && JSON.parse(self.localStorage.getItem(_this.store + "_store_context" + "(" + version + ")")).API ? JSON.parse(self.localStorage.getItem(_this.store + "_store_context" + "(" + version + ")")).API : null;
                    if (API) {
                        _this.API = API;
                        resolve(API);
                    } else {
                        setTimeout(retry, 2000);
                    }
                }
                retry();
            });
        };
        App.prototype.observer = function () {
            var _this = this;
            const handleDbChange = _.debounce((changes) => {
                // Ensure changes is an array
                if (!Array.isArray(changes)) {
                    changes = [changes];
                }
                const groupedChanges = {};
                changes.forEach(function (change) {
                    if (!change || !change.table) return;
                    let changeTable = "";
                    if (change.table === "anchors") return;
                    if (change.table.indexOf("IMS_products") > -1) {
                        changeTable = "IMS_products";
                        _this.IMSUpdate = true; // Track IMS updates
                    } else if (change.table.indexOf("IMS_menuItems") > -1) {
                        changeTable = "IMS_menuItems";
                    } else if (change.table.indexOf("integration") > -1) {
                        changeTable = (_this.API).toUpperCase() + " Item";
                        _this.integrationUpdate = true; // Track integration updates
                    } else if (change.table.indexOf("IMS_settings") > -1) {
                        changeTable = "setting";
                        _this.settingsUpdate = true; // Track settings updates
                    } else {
                        return;
                    }
                    if (!groupedChanges[changeTable]) groupedChanges[changeTable] = [];
                    groupedChanges[changeTable].push(change);
                });

                // Now process each group
                Object.keys(groupedChanges).forEach(function (changeTable) {
                    const group = groupedChanges[changeTable];
                    group.forEach(function (change, idx) {
                        // Only log first 6 changes per group if leader
                        if (idx > 5 || !leader) return;
                        switch (change.action) {
                            case 'added':
                                console.log(changeTable + ' added:', change.item);
                                break;
                            case 'updated':
                                console.log(changeTable + ' updated:', change.item);
                                break;
                            case 'deleted':
                                console.log(changeTable + ' deleted:', change.item);
                                break;
                            default:
                                break;
                        }
                    });
                    // If more than 6 changes in this group, log the rest as a table
                    if (group.length > 6 && leader) {
                        var logs = [];
                        group.forEach(function (each) {
                            each.item.action = each.action;
                            logs.push(each.item);
                        });
                        console.groupCollapsed("...and an additional " + (group.length - 6) + " " + changeTable + " changes");
                        console.table(logs.slice(6));
                        console.groupEnd();
                    }
                });
                if (_this.settingsUpdate === true && leader) {
                    integration.setUpdatedDate("settings");
                }
                if (_this.integrationUpdate === true && leader) {
                    integration.setUpdatedDate(_this.API);
                }
                if (_this.IMSUpdate === true && leader) {
                    integration.setUpdatedDate("IMS");
                }
                if (!_this.fullStart && (_this.integrationUpdate || _this.settingsUpdate || _this.IMSUpdate)) {
                    if (_this.API) {
                        _this.readDatabase();
                    } else {
                        _this.getAPI().then(function (api) {
                            _this.readDatabase();
                        });
                    }
                    _this.settingsUpdate = false;
                    _this.integrationUpdate = false;
                    _this.IMSUpdate = false;
                    _this.fullStart = false;
                }
                if (_this.fullStart && (_this.integrationUpdate || _this.API === "ims") && _this.IMSUpdate) {
                    if (_this.API) {
                        _this.readDatabase();
                    } else {
                        _this.getAPI().then(function (api) {
                            _this.readDatabase();
                        });
                    }
                    _this.settingsUpdate = false;
                    _this.integrationUpdate = false;
                    _this.IMSUpdate = false;
                    _this.fullStart = false;
                }
                changesQueue.length = 0;
            }, 50);
            const changesQueue = [];
            window.addEventListener('dbChangeEvent', (event) => {
                changesQueue.push(event.detail);
                handleDbChange(changesQueue);
            });
            window.addEventListener('storage', function (event) {
                if (event.key === _this.store + '_dbChangeEvent' + "(" + version + ")") {
                    var changes = JSON.parse(event.newValue);
                    if (Array.isArray(changes)) {
                        changesQueue.push.apply(changesQueue, changes); // Using spread operator to push all changes
                    } else {
                        changesQueue.push(changes);
                    }
                    handleDbChange(changesQueue);
                }
            });

            //watch for day change
            if (_this.dayWatcher) {
                clearInterval(_this.dayWatcher);
            }
            var savedDay = new Date(currentTime()).getDay()
            _this.dayWatcher = setInterval(function () {
                const momentDay = new Date(currentTime()).getDay()

                if (momentDay != savedDay) {
                    _this.readDatabase();
                    savedDay = momentDay;
                    console.log("Day changed...")
                }
            }, 30000)
            return true;
        };
        App.prototype.validateIMS = function (IMSProducts, IMSItems) {
            var _this = this;
            var date = new Date(currentTime());

            //handle products
            if (!IMSProducts) {
                return;
            }
            IMSProducts.forEach(function (each) {
                var termDate = null;
                if (each.terminateDate) {
                    termDate = new Date(each.terminateDate);
                }
                var startDate = new Date(each.effectiveDate);
                if ((each.terminateDate && termDate < date) || (each.effectiveDate && startDate > date)) {
                    each.enabled = false;
                }
            });

            //handle menu items 03.20.2025
            if (!IMSItems) {
                return;
            }

            //filter for correct date on the full week request / fallback to correct day only if offline
            const currentDate = currentTime();
            const currentDay = date.getDay();
            // Validate dates
            const dayMatch = IMSItems.filter(each => each.dayOfTheWeek === currentDay || each.dayOfTheWeek === -1);
            const dateValidated = IMSItems.filter(each => each.date === currentDate || each.dayOfTheWeek === -1);

            _this.IMSItems = window.allowMenusOffline ? dayMatch : dateValidated;

        };
        App.prototype.priceSchedule = function (menuItems) {
            const currentDate = new Date(currentTime());
            if (!menuItems) {
                return;
            }
            const processScheduledPrices = (item) => {
                if (item.scheduledPrices && item.scheduledPrices.length > 0) {
                    item.scheduledPrices = item.scheduledPrices.sort((a, b) => new Date(a.date) - new Date(b.date));
                    item.scheduledPrices.forEach((eachPrice) => {
                        eachPrice.date = new Date(eachPrice.date);
                        if (eachPrice.date <= currentDate) {
                            item.price = eachPrice.price;
                            item.calorie = eachPrice.calorie || item.calorie;
                        }
                    });
                }
            };
            menuItems.forEach((menuItem) => {
                processScheduledPrices(menuItem);
                if (menuItem.modifiers && menuItem.modifiers.length > 0) {
                    menuItem.modifiers.forEach((modifier) => {
                        processScheduledPrices(modifier);
                    });
                }
            });
        };
        App.prototype.calculatePrice = function (apiItems, eachIMS, apiMods, apiDiscounts) {
            const extractFormula = (IMSmappingId) => {
                const first = IMSmappingId.indexOf("(") + 1;
                const last = IMSmappingId.lastIndexOf(")");
                return IMSmappingId.substring(first, last);
            };
            var collectAllItems = function (apiItems, apiMods, apiDiscounts) {
                var allItems = [];
                if (apiItems) allItems.push.apply(allItems, apiItems);
                if (apiMods) allItems.push.apply(allItems, apiMods);
                if (apiDiscounts) allItems.push.apply(allItems, apiDiscounts);
                return allItems;
            };
            const findPlaceholders = (priceCalculation) => {
                // Regular expression to match placeholders (sequences of digits at least 5 characters long)
                return priceCalculation.match(/\b\d{5,}\b/g) || [];
            };
            const replacePlaceholders = (priceCalculation, allItems) => {
                let matches = 0;

                allItems.forEach((item) => {
                    if (priceCalculation.includes(item.mappingId)) {
                        matches++;
                        priceCalculation = priceCalculation.replace(new RegExp(item.mappingId, "g"), parseFloat(item.price));
                    }
                });
                let updatedPrice = priceCalculation;
                return {
                    matches,
                    updatedPrice
                };
            };
            let priceCalculation = extractFormula(eachIMS.IMSmappingId);
            const allItems = collectAllItems(apiItems, apiMods, apiDiscounts);
            const placeholders = findPlaceholders(priceCalculation);
            const {
                matches,
                updatedPrice
            } = replacePlaceholders(priceCalculation, allItems);
            // Replace all # characters with 0 (or another appropriate value)
            priceCalculation = updatedPrice.replace(/#/g, "");
            try {
                priceCalculation = math.evaluate(priceCalculation).toFixed(2).toString();
            } catch (err) {
                priceCalculation = "";
            }
            // Show error if match not found
            if (matches !== placeholders.length) {
                priceCalculation = "";
            }
            // Remove leading 0s
            if (priceCalculation.startsWith("0")) {
                priceCalculation = priceCalculation.replace(/^0+/, "");
            }
            return priceCalculation;
        };
        App.prototype.formatIMS = function (IMSItems) {
            var _this = this;
            if (!IMSItems) {
                return;
            }
            //make IMS mods accessible
            IMSItems.forEach(function (eachIMS) {
                eachIMS.IMSmappingId = _this.getBestMappingId(eachIMS);
                eachIMS.ApiSource = _this.API;
                eachIMS.ApiSynced = true;
                if (eachIMS.modifiers) {
                    eachIMS.modifiers.forEach(function (eachMod) {
                        eachMod.productId = eachIMS.productId + "_" + eachMod.productModifierId;
                        eachMod.categoryId = null;
                        eachMod.subCategoryId = null;
                        eachMod.ApiSource = _this.API;
                        eachMod.ApiSynced = true;
                        eachMod.IMSmappingId = _this.getBestMappingId(eachMod);
                        if (eachMod.price && !eachMod.IMSmappingId) {
                            eachIMS["Price_" + eachMod.productModifierId] = eachMod.price;
                        }
                        IMSItems.push(eachMod);
                    });
                }
            });
        };
        App.prototype.alignItems = function (apiItems, apiMods, apiDiscounts, IMSProducts) {
            const _this = this;
            if (!apiItems.length || !IMSProducts.length || _this.API === "ims") {
                return;
            }
            // Make IMS mods accessible
            IMSProducts.forEach(IMSProduct => {
                if (IMSProduct.modifiers) {
                    IMSProduct.modifiers.forEach(modifier => {
                        modifier.productId = `${IMSProduct.productId}_${modifier.productModifierId}`;
                        modifier.category = IMSProduct.productName;
                        modifier.subCategoryId = null;
                        modifier.IMSmappingId = _this.getBestMappingId(modifier);
                        if (modifier.price && !modifier.IMSmappingId) {
                            IMSProduct[`Price_${modifier.productModifierId}`] = modifier.price;
                        }
                        if (modifier.IMSmappingId.includes("calc(") && modifier.IMSmappingId.includes(")")) {
                            modifier.price = _this.calculatePrice(apiItems, modifier, apiMods);
                            IMSProduct[`Price_${modifier.productModifierId}`] = modifier.price;
                        }
                        if (modifier.externalId && modifier.IMSmappingId) {
                            apiItems.forEach(apiItem => {
                                if (modifier.IMSmappingId === apiItem.mappingId) {
                                    IMSProduct[`Price_${modifier.productModifierId}`] = apiItem.price;
                                }
                            });
                        }
                        IMSProducts.push(modifier);
                    });
                }
                // Make choice of IMS Mapping ID - could use automation
                IMSProduct.IMSmappingId = _this.getBestMappingId(IMSProduct);
                IMSProduct.ApiSource = _this.API;
            });
            // Align products
            IMSProducts.forEach(IMSProduct => {
                IMSProduct.ApiSynced = IMSProduct.externalId ? false : "blank";
                IMSProduct.APIActive = IMSProduct.externalId ? false : "blank";
                IMSProduct.ApiSource = "ims";
                IMSProduct.price = IMSProduct.price || null;
                if (IMSProduct.IMSmappingId.includes("calc(") && IMSProduct.IMSmappingId.includes(")")) {
                    IMSProduct.price = _this.calculatePrice(apiItems, IMSProduct, apiMods, apiDiscounts);
                    IMSProduct.ApiSynced = IMSProduct.price ? true : false;
                    IMSProduct.APIActive = IMSProduct.price ? true : false;
                }
                //Align mods - lowest priority
                apiMods.forEach(apiMod => {
                    if (apiMod.mappingId.includes(IMSProduct.IMSmappingId) && IMSProduct.IMSmappingId) {
                        IMSProduct.price = apiMod.price ? parseFloat(apiMod.price).toFixed(2) : IMSProduct.price;
                        IMSProduct.outOfStock = apiMod.isOutOfStock || IMSProduct.outOfStock;
                        IMSProduct.ApiSynced = true;
                        IMSProduct.ApiSource = _this.API;
                        IMSProduct.APIActive = apiMod.active || "blank";
                        Object.assign(apiMod, {
                            IMSproductId: IMSProduct.productId,
                            IMSdisplayName: IMSProduct.displayName,
                            IMSmenuDescription: IMSProduct.menuDescription,
                            IMSenabled: IMSProduct.enabled,
                            IMSoutOfStock: IMSProduct.outOfStock
                        });
                    }
                });
                //Align Items - highest priority
                apiItems.forEach(apiItem => {
                    if (apiItem.mappingId.includes(IMSProduct.IMSmappingId) && IMSProduct.IMSmappingId) {
                        IMSProduct.price = apiItem.price ? parseFloat(apiItem.price).toFixed(2) : IMSProduct.price;
                        IMSProduct.outOfStock = apiItem.isOutOfStock || IMSProduct.outOfStock;
                        IMSProduct.ApiSynced = true;
                        IMSProduct.ApiSource = _this.API;
                        IMSProduct.APIActive = apiItem.active || "blank";
                        Object.assign(apiItem, {
                            IMSproductId: IMSProduct.productId,
                            IMSdisplayName: IMSProduct.displayName,
                            IMSmenuDescription: IMSProduct.menuDescription,
                            IMSenabled: IMSProduct.enabled,
                            IMSoutOfStock: IMSProduct.outOfStock
                        });
                    }
                });
            });
            _this.IMSProducts = IMSProducts;
            _this.integrationItems = apiItems;
            _this.integrationModifiers = apiMods;
        };
        App.prototype.getBestMappingId = function (item) {
            const _this = this;
            let mappingIdValue = "";

            switch (_this.API) {
                case "qu":
                    mappingIdValue = item.quBeyondId || item.secondaryExternalId || item.externalId || "";
                    break;
                case "revel":
                    mappingIdValue = item.revelId || item.externalId || item.secondaryExternalId || "";
                    break;
                case "toast":
                    mappingIdValue = item.toastId || item.externalId || item.secondaryExternalId || "";
                    break;
                case "par":
                    mappingIdValue = item.parBrinkId || item.externalId || item.secondaryExternalId || "";
                    break;
                case "clover":
                    mappingIdValue = item.cloverId || item.externalId || item.secondaryExternalId || "";
                    break;
                case "shift4":
                    mappingIdValue = item.shift4Id || item.externalId || item.secondaryExternalId || "";
                    break;
                case "simphony":
                    mappingIdValue = item.simphonyId || item.externalId || item.secondaryExternalId || "";
                    break;
            }

            return mappingIdValue;
        }

        App.prototype.mergeIMS = function (IMSProducts, IMSItems) {
            var _this = this;
            if (!IMSItems) {
                return;
            }
            IMSItems.forEach(function (eachItem) {
                IMSProducts.forEach(function (eachProduct) {
                    if (eachProduct.productId === eachItem.productId) {
                        eachItem = Object.assign(eachItem, eachProduct);
                    }
                });
            });
            IMSItems = IMSItems.sort(function (a, b) {
                return a.sortOrder - b.sortOrder;
            });
        };
        App.prototype.readDatabase = function () {
            var _this = this;
            if (!_this.API) {
                return;
            }
            if (isUsingIndexedDB) {
                try {
                    _this.db.integration_products
                        .toArray(function (result) {
                            _this.integrationItems = result;
                        })
                        .then(function () {
                            return _this.db.integration_modifiers.toArray(function (result) {
                                _this.integrationMods = result;
                            });
                        })
                        .then(function () {
                            return _this.db.IMS_menuItems.toArray(function (result) {
                                _this.IMSItems = result;
                            });
                        })
                        .then(function () {
                            return _this.db.integration_discounts.toArray(function (result) {
                                _this.integrationDiscounts = result;
                            });
                        })
                        .then(function () {
                            return _this.db.IMS_products.toArray(function (result) {
                                _this.IMSProducts = result;
                            });
                        })
                        .then(function () {
                            return _this.db.IMS_settings.toArray(function (result) {
                                _this.IMSSettings = result;
                            });
                        })
                        .then(function () {
                            _this.priceSchedule(_this.IMSProducts);
                            _this.validateIMS(_this.IMSProducts, _this.IMSItems);
                            try {
                                _this.alignItems(_this.integrationItems, _this.integrationMods, _this.integrationDiscounts, _this.IMSProducts);
                            } catch (err) {
                                // move on...
                            }
                            if (_this.API === "trm" || _this.API === "ims") {
                                _this.formatIMS(_this.IMSProducts);
                            } else {
                                //check IMS products
                            }
                            _this.mergeIMS(_this.IMSProducts, _this.IMSItems);
                            tableBuilder.init(_this.integrationItems, _this.integrationModifiers, _this.integrationDiscounts, _this.IMSProducts, _this.IMSItems, _this.API)
                            menuLayout.init(_this.IMSItems, _this.IMSProducts, _this.IMSSettings, _this.integrationItems, _this.API);

                            $(".loading").hide();
                            $(".asset-wrapper").removeClass("blur");
                        })
                        .catch(function (error) {
                            //catch database clear event and reopen
                            if (error.name === "DatabaseClosedError") {
                                //wait for previous leader 
                                _this.fullStart = true;
                                integration.openDatabase().then(function () {
                                    _this.db = integration.db;
                                })
                            }
                        });
                } catch (err) {
                    console.error(err)
                }
            }
            if (!isUsingIndexedDB) {
                //local Storage
                try {
                    _this.integrationItems = JSON.parse(self.localStorage.getItem(_this.store + "_" + "integration_products" + "(" + version + ")")) || [];
                }
                catch (err) {
                    _this.integrationItems = [];
                }
                try {
                    _this.integrationMods = JSON.parse(self.localStorage.getItem(_this.store + "_" + "integration_modifiers" + "(" + version + ")")) || [];
                }
                catch (err) {
                    _this.integrationMods = [];
                }
                try {
                    _this.integrationDiscounts = JSON.parse(self.localStorage.getItem(_this.store + "_" + "integration_discounts" + "(" + version + ")")) || [];
                }
                catch (err) {
                    _this.integrationDiscounts = [];
                }
                try {
                    _this.IMSProducts = JSON.parse(self.localStorage.getItem(_this.store + "_" + "IMS_products" + "(" + version + ")")) || [];
                }
                catch (err) {
                    _this.IMSProducts = [];
                }
                try {
                    _this.IMSItems = JSON.parse(self.localStorage.getItem(_this.store + "_" + "IMS_menuItems" + "(" + version + ")")) || [];
                }
                catch (err) {
                    _this.IMSItems = [];
                }
                try {
                    _this.IMSSettings = JSON.parse(self.localStorage.getItem(_this.store + "_" + "IMS_settings" + "(" + version + ")")) || [];
                }
                catch (err) {
                    _this.IMSSettings = [];
                }
                _this.priceSchedule(_this.IMSProducts);
                _this.validateIMS(_this.IMSProducts);
                try {
                    _this.alignItems(_this.integrationItems, _this.integrationMods, _this.integrationDiscounts, _this.IMSProducts);
                }
                catch (err) { }
                if (_this.API === "trm" || _this.API === "ims") {
                    _this.formatIMS(_this.IMSProducts);
                }
                $(".loading").hide();
                _this.mergeIMS(_this.IMSProducts, _this.IMSItems);
                menuLayout.init(_this.IMSItems, _this.IMSProducts, _this.IMSSettings, _this.integrationItems, _this.API);
            }
        };
        return App;
    })();
    IMSintegration.App = App;
})(IMSintegration || (IMSintegration = {}));
