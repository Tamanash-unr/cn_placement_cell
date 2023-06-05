{
    // Handle on Download All button clicked
    function downloadCSV(){
        const btn = $('#download-btn');

        btn.click(function(evt){
            evt.preventDefault();

            $.ajax({
                type:'get',
                url:$(btn).prop('href'),
                success: function(data){

                    const blob = new Blob([data.csv], {type: 'application/csv'});
                    const url = URL.createObjectURL(blob);

                    const file = document.createElement('a');
                    file.download = 'placement_data.csv';
                    file.href = url;
                    file.style.display = 'none';

                    document.body.appendChild(file);
                    file.click();

                    file.remove();
                    URL.revokeObjectURL(blob);

                    createNoty('success', data.message);
                },
                error: function(error){
                    console.log(error.responseText);
                }
            })
        });
    }

    // Method to Create Noty Message
    function createNoty(type, message){
        return new Noty({
                    theme: 'relax',
                    type: type,
                    layout: 'topRight',
                    text: message,
                    timeout: 3000,
                }).show();
    }

    downloadCSV();
}