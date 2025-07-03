//Publisher: Wand Digital
//Date: 10.28.2024
//Version: 5.1
//***wandLib.js***
//compare strings for match in percent
//stringSimilarity.compareTwoStrings({string}, {string}) >= .725
// rotate one or ore elements with settings
//rotate(ele, { delay: 100, cycle: 8000, fill: 'packed', transition: 'fade'});
//filling elements should be done with code like this$('.items-wrapper[dynamicFill="true"]') 
//  <div class="items-wrapper" dynamic-fill="true"></div>
//fit text space allowed
//textFit({string}) >> must be visable when called to calculate width/height
//polyfil includes() ++ > any more methods just ask
var IMSintegration;
(function (wandDigital) {
	var MenuLayout = (function () {
		function MenuLayout() {
			this.isRotating = false;
			this.timeOuts = [];
			this.trmAnimate = this.trmAnimate.bind(this);
			this.integrationItems;
			console.log("Find me in Inspect");
		}
		MenuLayout.prototype.init = function (IMSItems, IMSProducts, IMSSettings, integrationItems, API) {
			if (!API) {
				return;
			}
//			this.integrationItems = integrationItems;
//			this.handleSettings(IMSSettings);
//			this.handleProducts(IMSProducts);
//			this.handleLayout(IMSSettings);
//			this.fillDynamic(IMSItems, integrationItems);
//			this.injectPricing(IMSProducts);
//            
//			//optional starts
//			this.rotateEles();
		};
		MenuLayout.prototype.handleSettings = function (IMSSettings) {
			var _this = this;
			if (!IMSSettings || IMSSettings.length === 0) {
				return;
			}
		};
		MenuLayout.prototype.handleLayout = function (IMSSettings) {
			var _this = this;
			if (!IMSSettings || IMSSettings.length === 0) {
				return;
			}
		};
		MenuLayout.prototype.handleProducts = function (IMSProducts) {
			var _this = this;
			if (!IMSProducts || IMSProducts.length === 0) {
				return;
			}
			IMSProducts.forEach(function (each) {
				if (!each.active || !each.enabled || each.outOfStock) {
					return;
				}
			});
		};
		MenuLayout.prototype.rotateEles = function () {
			//rotate(ele, { delay: 100, cycle: 8000, fill: 'packed', transition: 'fade'});
		};
		MenuLayout.prototype.trmAnimate = function (playing) {
			//called with playing each time asset plays in digital client. _this is accessible
			var _this = this;
			if (!AssetConfiguration || !AssetConfiguration.Duration || AssetConfiguration.Duration === 0) {
				return;
			}
		};
		MenuLayout.prototype.fillDynamic = function (IMSItems, integrationItems) {
			var _this = this;

			_this.clearMenuItems($(".dynamic"));

		};
		MenuLayout.prototype.clearMenuItems = function (zone) {
			var containers = $(zone).get();
			containers.forEach(function (container) {
				while (container.hasChildNodes()) {
					container.removeChild(container.lastChild);
				}
			});
		};
		MenuLayout.prototype.handleWebtrtion = function () {
			//filter first for performance
			var displays = AssetConfiguration.Display.split(",");


			//filter first for performance
			function filterForStation(each) {
				var callback = false;
				displays.forEach(function (eachDisplay) {
					if (stringSimilarity.compareTwoStrings(each.mealPeriod.toLowerCase(), AssetConfiguration.Daypart.toLowerCase()) >= .725 && stringSimilarity.compareTwoStrings(each.mealStation.toLowerCase(), eachDisplay.toLowerCase()) >= .725) {
						callback = true;
					}
				})
				return callback
			}

			//find items for station and daypart
			webtrition = webtrition.filter(filterForStation);
		}
		MenuLayout.prototype.injectPricing = function (IMSItems, IMSSettings) {
			var _this = this;
			if (!IMSItems || IMSItems.length === 0) {
				return;
			}
			IMSItems.forEach(function (each) {
				if (each.productId && each.price && each.active) {
					$(".Cost-" + each.productId).html(each.price);
					$(".Cost-" + each.productId).addClass(each.wandTrmId);
					if (each.ApiSource === "qu") {
						$(".Cost-" + each.productId).addClass("qu");
						$(".Cost-" + each.productId).removeClass("par");
						$(".Cost-" + each.productId).removeClass("revel");
						$(".Cost-" + each.productId).removeClass("ims");
					}
					if (each.ApiSource === "revel") {
						$(".Cost-" + each.productId).addClass("revel");
						$(".Cost-" + each.productId).removeClass("par");
						$(".Cost-" + each.productId).removeClass("qu");
						$(".Cost-" + each.productId).removeClass("ims");
					}
					if (each.ApiSource === "par") {
						$(".Cost-" + each.productId).addClass("par");
						$(".Cost-" + each.productId).removeClass("revel");
						$(".Cost-" + each.productId).removeClass("qu");
						$(".Cost-" + each.productId).removeClass("ims");
					}
					if (!each.ApiSource) {
						$(".Cost-" + each.productId).addClass("ims");
						$(".Cost-" + each.productId).removeClass("par");
						$(".Cost-" + each.productId).removeClass("qu");
						$(".Cost-" + each.productId).removeClass("revel");
					}
				} else {
					var error = Mustache.to_html(MenuLayout.error, each);
					$(".Cost-" + each.productId).html(error);
					$(".Cost-" + each.productId).addClass(each.wandTrmId);
				}
				if (each.productId && each.calorie) {
					$(".Calories-" + each.productId).html(each.calorie);
					$(".Calories-" + each.productId).addClass("ims");
				} else {
					var error = Mustache.to_html(MenuLayout.error, each);
					$(".Calories-" + each.productId).html(error);
				}
				if (each.productId && each.displayName) {
					$(".Name-" + each.productId).html(each.displayName);
				} else {
					var error = Mustache.to_html(MenuLayout.error, each);
					$(".Name-" + each.productId).html(error);
				}
				if (each.productId && each.menuDescription) {
					$(".Desc-" + each.productId).html(each.menuDescription);
				} else {
					//do nothing
				}
				if (each.productId && !each.enabled && each.ApiSource) {
					$(".Cost-" + each.productId).attr("active", "false");
					$(".Item-" + each.productId).hide();
				} else {
					$(".Cost-" + each.productId).attr("active", "true");
					$(".Item-" + each.productId).show();
				}
				if (each.productId && each.outOfStock) {
					$(".ItemOOS-" + each.productId).css("opacity", "0");
				} else {
					$(".ItemOOS-" + each.productId).css("opacity", "");
				}
			});
		};
		MenuLayout.COST = '{{dollars}}<span class="cents ">{{cents}}</span>';
		MenuLayout.error = '<span class="material-icons ">error</span>';
		return MenuLayout;
	})();
	IMSintegration.MenuLayout = MenuLayout;
})(IMSintegration || (IMSintegration = {}));
