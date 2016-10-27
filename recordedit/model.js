// A value to hold the columns from the designated table
(function() {
    'use strict';

    angular.module('chaise.recordEdit')

    .value('recordEditModel', {
        table: {},
        rows: [{}], // rows of data in the form, not the table from ERMrest
        submissionRows: [{}] // rows of data converted to raw data for submission
        // , filterUri: ''
    });
})();
