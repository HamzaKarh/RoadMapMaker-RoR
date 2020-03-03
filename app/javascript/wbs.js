/*jQuery(document).ready(() =>{
 


    var select_tag = document.getElementById("select_tag")
    var generate_button = document.getElementById('generate_button')
    var generation_field = document.getElementById('actionSpawn')
    generate_button.addEventListener("click", $(val = select_tag.options[select_tag.selectedIndex].value, {
    
        url: "/counteractions/" + val,
        type: "GET",
        datatype: "json",
        success: (data) => {
            var action = JSON.parse(data)
            var action_box = generation_field.append("svg").attr("width", 50).attr("height", 50).attr("fill", purple)
            
        }

    }))
    //generate = () => {}
    
 
})*/