sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/f/library"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, fioriLibrary) {
    "use strict";
    return Controller.extend("erp2324.controller.App", {
      onInit: function () {},
      onNavToMain: function (oEvent) {
        this.getOwnerComponent().getRouter().navTo("main");
      },
      onSalePress: function (oEvent) {
        let sSaleItemPath = oEvent.getSource().getBindingContext().getPath(),
          oSelectedSale = sSaleItemPath.split("'")[1];
        this.getOwnerComponent().getRouter().navTo("saleItem", {
          layout: fioriLibrary.LayoutType.TwoColumnsMidExpanded,
          SaleParam: oSelectedSale,
        });
      },
      TimeFormatter: function (timeValue) {
        var timeInMilliseconds = timeValue.ms;
        var date = new Date(timeInMilliseconds);

        var formattedTimeUTC = date.toUTCString().split(" ")[4];

        return formattedTimeUTC;
      },
    });
  }
);
