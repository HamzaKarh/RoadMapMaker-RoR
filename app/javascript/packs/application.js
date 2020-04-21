// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

//= require rails-ujs
//= require jquery/dist/jquery
//= require activestorage
//= require interactjs/interact
//= require_tree . 


// <svg width="500" height="500"><line x1="50" y1="50" x2="350" y2="350" stroke="black"/></svg>

jQuery(document).ready( () => {
    
    var field = document.getElementById("wbsDrawingField")
    var action_id = 0
    function dragMoveListener (event) {
        var target = event.target
        // keep the dragged position in the data-x/data-y attributes
        var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
        var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy
      
        // translate the element
        target.style.webkitTransform =
          target.style.transform =
            'translate(' + x + 'px, ' + y + 'px)'
      
        // update the posiion attributes
        target.setAttribute('data-x', x)
        target.setAttribute('data-y', y)
    }

    $('#generate_button').on('click', function(e) {
        
        selected_action = document.getElementById("select_tag").value
        anchor = document.getElementById("spawn_anchor")
        var action_holder = document.createElement("div")
        action_id = action_id + 1
        action_holder.id = 'action-'+action_id
        $(action_holder).css({ 'position' : 'absolute'})
        action_holder.classList.add('draggable')
        action_holder.innerHTML = selected_action
        anchor.appendChild(action_holder)
        


    

    })

    interact('.draggable').draggable({
        
        autoScroll: true,
        inertia: true,
        listeners: {
            // call this function on every dragmove event
            move: dragMoveListener
        }
        
    })

    function clearSelected(){
        var selected = document.getElementsByClassName("selected")
        console.log("test")
        for (i=0; i<selected.length; i++){
            
            var val = document.getElementById(selected[i].id)
            val.classList.remove('selected')
            
        }
        console.log("selected cleared")

    }
    


    interact('#wbsDrawingField').dropzone({
        // only accept elements matching this CSS selector
        accept: '.draggable',
        // Require a 75% element overlap for a drop to be possible
        overlap: 0.75,
        
        // listen for drop related events:
        
        ondropactivate: function (event) {
          // add active dropzone feedback
        },
        ondragenter: function (event) {
          // feedback the possibility of a drop
            var dropzoneElement = event.target
            dropzoneElement.classList.add('drop-target')
        },
        ondragleave: function (event) {
          // remove the drop feedback style
        },
        ondrop: function (event) {
            var draggableElement = event.relatedTarget, dropzoneElement = event.target
          
            dropzoneElement.classList.add('drop-target')
            draggableElement.classList.add('dropped')
            draggableElement.classList.remove('draggable')
            interact('.dropped').draggable({
        
                autoScroll: true,
                inertia: true,
                modifiers: [
                    interact.modifiers.restrictRect({
                        restriction: dropzoneElement,
                        endOnly: true
                  })],
                listeners: {
                    // call this function on every dragmove event
                    move: dragMoveListener
                }
                
            })


            $('.dropped').on('click', function(e) {
                var selected = document.getElementsByClassName("selected") 
                if (selected.length < 2){
                    val = document.getElementById(e.target.id)
                    val.classList.add("selected")
                }
            })

            $('.colorPalet').on('click', function(e) {
                var clicked = e.target.id
                changeColor(clicked)
                
            })
            
            $('#link_action_button').on('click', function(e) {
                Link()
                refreshLinksXY()
                clearSelect() 
            })








            //treatment methods

            function Link(){
                var selected = document.getElementsByClassName("selected")



                // ------------------------------------------------------------------ \\
                var link_container = document.createElement("svg")
                var link_line = document.createElement("line")
                var link_spawn = document.getElementById("spawn_anchor")
                var link_id = "link-"
                console.log( "selected before linking : "+selected.length)
                var i = 0
                selected.forEach(function(value){
                    if (i<2){ 
                        var tmp = value
                        link_id += tmp.substring(7)
                        console.log("link log x,y: " +document.getElementById(value).getAttribute("data-x") +"  "+ document.getElementById(value).getAttribute("data-y"))
                        i++
                    }
                })
                link_container.classList.add("link")
                link_container.id =link_id
                link_spawn.appendChild(link_container)
                link_container.appendChild(link_line)
            }

            function refreshLinksXY(){
                $('svg.link').each(function(){
                    var $link = $(this)
                    var linkId = $link.id
                    var action1 = document.getElementById("action-"+linkId.substr(5))
                    var action2 = document.getElementById("action-"+linkId.substr(6))
                    var x1, x2, y2, y1
                    x1 = Number(action1.getAttribute("data-x"))
                    y1 = Number(action1.getAttribute("data-y"))
                    x2 = Number(action2.getAttribute("data-x"))
                    y2 = Number(action2.getAttribute("data-y"))
                    console.log("x1:" + x1 + " y1:" + y1 +" x2:" + x2 + " y2:" + y2 )
                    var dim1 = x1 - x2 
                    var dim2 = y1 - y2
                    console.log("dim1:" + dim1 +" dim2" + dim2)
                    
                    
                })
            }

            function changeColor(value){
                switch(value) {
                    case 'red':
                        selected.forEach(function(value){
                            var val = document.getElementById(value)
                            val.classList.remove('green')
                            val.classList.remove('yellow')
                            val.classList.remove('blue')
                            val.classList.add('red')
                        })
                        clearSelect()
                        break;
                    case 'blue':
                        selected.forEach(function(value){
                        var val = document.getElementById(value)
                        val.classList.remove('green')
                        val.classList.remove('yellow')
                        val.classList.remove('red')
                        val.classList.add('blue')

                    })
                    clearSelect()

                    break;
                    case 'green':
                        selected.forEach(function(value){
                        var val = document.getElementById(value)
                        val.classList.remove('yellow')
                        val.classList.remove('blue')
                        val.classList.remove('red')
                        val.classList.add('green')
                    })
                    clearSelect()
                    break;
                    case 'yellow':
                        selected.forEach(function(value){
                        var val = document.getElementById(value)
                        val.classList.remove('green')
                        val.classList.remove('blue')
                        val.classList.remove('red')
                        val.classList.add('yellow')
                        
                    })
                    clearSelect()
                    break;
                    
                    default:
                }
            
            }
            
            $('#wbsDrawingField').on('click', function(e) {
                clearSelected()
            })


            
        }

    })
    
      





    
    
    
 
})

               /*
                if(selected.length < 2 ){
                    console.log('Please select 2 actions')
                }else if(selected.length >= 2){
                    var link_container = document.createElement("svg")
                    var link_line = document.createElement("line")
                    var link_spawn = document.getElementById("spawn_anchor")
                    var link_id = "link-"
                    var positions = []
                    for (i = 0; i<2 ; i++){
                        var tmp = selected[i] + "" 
                        link_id += tmp.substring(7)
                        positions.push(document.getElementById(selected[i]).getAttribute("data-x"))
                        positions.push(document.getElementById(selected[i]).getAttribute("data-y"))
                        console.log(document.getElementById(selected[i]).getAttribute("data-x") +"  "+ document.getElementById(selected[i]).getAttribute("data-y"))
                    }

                    var height = Math.abs(Number(positions[1])- Number(positions[3]))
                    var width = Math.abs(Number(positions[0])- Number(positions[2]))
                    console.log(height + " " + width)
                    //link_container.style.width = width+"px"
                    //link_container.style.height = height+"px"
                    link_container.id =link_id
                    link_spawn.appendChild(link_container)
                    link_container.appendChild(link_line)
                    link_container.setAttribute('height' , Math.round(height) )
                    link_container.setAttribute('width' , Math.round(width) )
                    link_line.setAttribute('stroke' , 'black')
                    link_line.setAttribute('x1' , "" + Math.round(positions[0]))
                    link_line.setAttribute('x2' , "" + Math.round(positions[2]))
                    link_line.setAttribute('y1' , "" + Math.round(positions[1]))
                    link_line.setAttribute('y2' , "" + Math.round(positions[3]))                    
                }
                
*/

/*


    interact('#wbsDrawingField').dropzone({
        // only accept elements matching this CSS selector
        accept: '.draggable',
        // Require a 75% element overlap for a drop to be possible
        overlap: 0.75,
    
        // listen for drop related events:
    
        ondropactivate: function (event) {
        // add active dropzone feedback
        event.target.classList.add('drop-active')
        },
        ondragenter: function (event) {
        var draggableElement = event.relatedTarget
        var dropzoneElement = event.target
    
        // feedback the possibility of a drop
        dropzoneElement.classList.add('drop-target')
        draggableElement.classList.add('can-drop')
        draggableElement.textContent = 'Dragged in'
        },  
        ondragleave: function (event) {
        // remove the drop feedback style
        event.target.classList.remove('drop-target')
        event.relatedTarget.classList.remove('can-drop')
        event.relatedTarget.textContent = 'Dragged out'
        },
        ondrop: function (event) {
        event.relatedTarget.textContent = 'Dropped'
        },
        ondropdeactivate: function (event) {
        // remove active dropzone feedback
        event.target.classList.remove('drop-active')
        event.target.classList.remove('drop-target')
        }
    })

document.getElementById('actionSpawn').addEventListener("click", $(val = select_tag.options[select_tag.selectedIndex].val, {
    url: "/counteractions/" + val,
    type: "GET",
    datatype: "json",
    success: (data) => {
        alert('test')
        

        var action = JSON.parse(data)
        generation_field.append("svg").attr("width", 50).attr("height", 50).attr("fill", purple)
        
    }

}))
*/