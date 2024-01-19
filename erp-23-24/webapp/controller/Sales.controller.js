sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/f/library",
    "../util/SortAndFilterHelper",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, fioriLibrary, SortAndFilterHelper) {
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
      handleSorterButtonPressed: function () {
        SortAndFilterHelper.handleSortButtonPressed(
          this,
          "erp2324.fragments.saleSortDialog"
        );
      },
      handleSortDialogConfirm: function (oEvent) {
        SortAndFilterHelper.handleSortDialogConfirm(oEvent, this, "SalesTable");
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
