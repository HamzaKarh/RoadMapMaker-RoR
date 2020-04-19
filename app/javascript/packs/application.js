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
        var style = {'background-color':'#0095B6', 
          'text-align': 'center',
          'min-height': '4em',
          'min-width': '2.5em',
          'max-width': '4em',
          'border-radius': '10px',
          'padding-top': '10px ', 
          'padding-bottom': '10px ', 
          'padding-left': '10px ', 
          'padding-right': '10px ', 
          'color': 'white',
          'position' : 'absolute'
        }
        selected = document.getElementById("select_tag").value
        anchor = document.getElementById("spawn_anchor")
        var action_holder = document.createElement("div")
        $(action_holder).css(style)
        action_holder.classList.add('draggable')
        action_holder.innerHTML = selected
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
            draggableElement.classList.remove('draggable')
            draggableElement.classList.add('dropped')
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

        }

    })
    
      


    $('.draggable').on('click', function(e) {
        //selection code
    })


    
    
    
 
})
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

document.getElementById('actionSpawn').addEventListener("click", $(val = select_tag.options[select_tag.selectedIndex].value, {
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