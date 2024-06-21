$(document).ready(function () {
  $("#table_poc").DataTable({
    language: {
      decimal: "",
      emptyTable: "Aucune donnée disponible dans le tableau",
      info: "Affichage de _START_ à _END_ sur _TOTAL_ entrées",
      infoEmpty: "Affichage de 0 à 0 sur 0 entrée",
      infoFiltered: "(filtré à partir de _MAX_ entrées au total)",
      infoPostFix: "",
      thousands: ",",
      lengthMenu: "Afficher _MENU_ entrées",
      loadingRecords: "Chargement…",
      processing: "",
      search: "Rechercher :",
      zeroRecords: "Aucun enregistrement correspondant trouvé",
      paginate: {
        first: "Premier",
        last: "Dernier",
        next: "Suivant",
        previous: "Précédent",
      },
      aria: {
        orderable: "Trier par cette colonne",
        orderableReverse: "Trier par cette colonne en ordre inverse",
      },
    },
    pageLength: 5,
    initComplete: function () {
      this.api()
        .columns()
        .every(function () {
          var column = this;
          var select = $(
            '<select class="form-select"><option value=""></option></select>'
          )
            .appendTo($(column.footer()).empty())
            .on("change", function () {
              var val = $.fn.dataTable.util.escapeRegex($(this).val());

              column.search(val ? "^" + val + "$" : "", true, false).draw();
            });

          column
            .data()
            .unique()
            .sort()
            .each(function (d, j) {
              select.append('<option value="' + d + '">' + d + "</option>");
            });
        });
    },
  });
});
