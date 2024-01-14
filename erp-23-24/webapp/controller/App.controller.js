sap.ui.define(["sap/ui/core/mvc/Controller"], function (BaseController) {
  "use strict";

  return BaseController.extend("erp2324.controller.App", {
    onInit() {},
    onStateChanged: function (oEvent) {
      let oSettingsModel = this.getOwnerComponent().getModel("settings");
      let bIsNavigationArrow = oEvent.getParameter("isNavigationArrow"),
        sLayout = oEvent.getParameter("layout");

      // Replace the URL with the new layout if a navigation arrow was used
      if (bIsNavigationArrow) {
        this.oRouter.navTo(
          oSettingsModel.getProperty("/RouteName"),
          {
            layout: sLayout,
            customer: oSettingsModel.getProperty("/Material"),
          },
          true
        );
      }
    },
    onExit: function () {
      this.getOwnerComponent()
        .getRouter()
        .detachRouteMatched(this.onRouteMatched, this);
    },
  });
});
