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
    
    function renderLink(){
        
        var selected = document.getElementsByClassName("selected")
        
        if (selected.length == 2){
            var link_spawn = field
            var link_container = document.createElement("canvas")
            var link_id = "link-"
            
            for (i = 0; i<selected.length ; i++){
                link_id += selected[i].id.substr(7)
                link_id += "|"
            }
            link_container.id =link_id
            link_container.classList.add("link")
            link_container.setAttribute("height", document.getElementById("wbsDrawingField").innerHeight)
            link_container.setAttribute("width", document.getElementById("wbsDrawingField").innerWidth)
            link_spawn.appendChild(link_container)
        }
    }

    function getActionLinks(action){
        var links = document.getElementsByTagName("canvas")
        var link_list = [] 
        for (x = 0; x<links.length ; x++){
            if (links[x].id.includes(action.substr(7))){
                link_list.push(links[x])
            }
        }
        
        return link_list
        
    }
    

 


    function refreshActionLinks(link_list){

        for (x = 0 ; x<link_list.length; x++){
            //selecting the right actionbox
            var action1 = "action-", action2 = "action-"
            link_id = link_list[x].id.substr(5)
            var charCounter = 0
            var index = 0
            for (i = 0; i<2 ; i++){
                while(link_id.slice(charCounter, charCounter+1) != "|" && link_id.slice(charCounter, charCounter+1)  ){
                    charCounter++
                }
                if(i == 0){
                    action1 += link_id.substr(index, charCounter)
                    index = charCounter + 1
                }else if(i == 1){
                    action2 += link_id.substr(index, charCounter-2)
                }
                charCounter ++
            }
            var field = document.getElementById("wbsDrawingField")
            //refreshing link xy and length
            var x1 = document.getElementById(action1).getAttribute("data-x");
            var y1 = document.getElementById(action1).getAttribute("data-y");
            var x2 = document.getElementById(action2).getAttribute("data-x");
            var y2 = document.getElementById(action2).getAttribute("data-y");
            //var width = Math.abs(Number(x1) - Number(x2))
            //var height = Math.abs(Number(y1) - Number(y2))
            var link = document.getElementById("link-"+link_id)
            var tmpid = "link-"+link_id
            field.removeChild(link)
            var link = document.createElement("canvas")
            link.id = tmpid
            link.setAttribute("height", document.getElementById("wbsDrawingField").getBoundingClientRect().height)
            link.setAttribute("width", document.getElementById("wbsDrawingField").getBoundingClientRect().width)
            link.setAttribute("style", "position:absolute")
            field.appendChild(link)
            /**
             var draggableElement = event.relatedTarget, dropzoneElement = event.target
            var id = draggableElement.id
            var txt = draggableElement.innerHTML
            */
            var context = link.getContext('2d')
            context.moveTo(Number(x1) + (Number(document.getElementById(action1).getBoundingClientRect().width)/2), Number(y1) + (Number(document.getElementById(action1).getBoundingClientRect().height)/2))
            context.lineTo(Number(x2) + (Number(document.getElementById(action2).getBoundingClientRect().width)/2), Number(y2) + (Number(document.getElementById(action2).getBoundingClientRect().height)/2))
            context.stroke()
        }

    }
    
    function refreshAllLinksXY(){
        var links = document.getElementsByTagName("canvas")
        refreshActionLinks(links) 
    }
    
    
    function dragMoveListener (event) {
        var refreshingRate = 10
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
        //refreshActionLinks(target.id)
        if( typeof dragMoveListener.counter == 'undefined' ) {
            dragMoveListener.counter = 0
        }else{
            dragMoveListener.counter++;
        }
        if (dragMoveListener.counter % refreshingRate == 0){
            var links = getActionLinks(target.id)
            refreshActionLinks(links)
        }
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
        },
        autoScroll: true
        
    })

    function clearSelected(){
        var selected = document.getElementsByClassName("selected")
        for (i=0; i<selected.length; i++){
            
            var val = document.getElementById(selected[i].id)
            val.classList.remove('selected')
            
        }

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
            refreshAllLinksXY()

          // remove the drop feedback style
        },
        ondrop: function (event) {
            var draggableElement = event.relatedTarget, dropzoneElement = event.target
            var id = draggableElement.id
            var txt = draggableElement.innerHTML
            draggableElement.parentNode.removeChild(draggableElement)
            draggableElement = document.createElement("div")
            draggableElement.id = id 
            draggableElement.innerHTML = txt
            $(draggableElement).css({'position' : 'absolute'})
            draggableElement.classList.add('dropped')
            document.getElementById("wbsDrawingField").appendChild(draggableElement)
            
            
            
            
            /**
             selected_action = document.getElementById("select_tag").value
             anchor = document.getElementById("spawn_anchor")
             var action_holder = document.createElement("div")
             action_id = action_id + 1
             action_holder.id = 'action-'+action_id
             $(action_holder).css({ 'position' : 'relative'})
             action_holder.classList.add('draggable')
             action_holder.innerHTML = selected_action
             anchor.appendChild(action_holder) */
             
            dropzoneElement.classList.add('drop-target')
            draggableElement.classList.remove('draggable')
            interact('.dropped').draggable({
                
                autoScroll: true,
                inertia: false,
                modifiers: [
                     interact.modifiers.restrictRect({
                         restriction: dropzoneElement,
                         endOnly: true
                        })],
                        listeners: {
                            // call this function on every dragmove event
                            move: dragMoveListener
                        },
                        autoScroll: true,
                        
            })
            
            
            
            $('.dropped').on('click', function(e) {
                e.stopPropagation()
                var selected = document.getElementsByClassName("selected") 
                if (selected.length < 2){
                    val = document.getElementById(e.target.id)
                    val.classList.add("selected")
                }
                refreshActionLinks(getActionLinks(e.target.id))
            })

            $('.dropped').on('dragend', function(e) {
                refreshActionLinks(getActionLinks(e.target.id))
            })



            
            $('.colorPalet').on('click', function(e) {
                var clicked = e.target.id
                changeColor(clicked)
                
            })
            
            $('#link_action_button').on('click', function(e) {
                renderLink()
                refreshAllLinksXY()
                clearSelected() 
            })
            
            
                    
                    
                    
                    
                    
                    
                //treatment methods
                    
                    
                    
                    
            function changeColor(value){
                var selected = document.getElementsByClassName("selected")
                
                switch(value) {
                    case 'red':
                        for (i = 0; i<selected.length ; i++){
                            
                            var val = document.getElementById(selected[i].id)
                            val.classList.remove('green')
                            val.classList.remove('yellow')
                            val.classList.remove('blue')
                            val.classList.add('red')
                        }
                        clearSelected()
                        break;
                        case 'blue':
                            for (i = 0; i<selected.length ; i++){
                                
                                var val = document.getElementById(selected[i].id)
                                val.classList.remove('green')
                                val.classList.remove('yellow')
                                val.classList.remove('red')
                                val.classList.add('blue')
                                
                            }
                clearSelected()
                
                break;
                case 'green':
                    for (i = 0; i<selected.length ; i++){
                        var val = document.getElementById(selected[i].id)
                        val.classList.remove('yellow')
                        val.classList.remove('blue')
                        val.classList.remove('red')
                        val.classList.add('green')
                    }
                    clearSelected()
                    break;

                case 'yellow':
                    for (i = 0; i<selected.length ; i++){
                        var val = document.getElementById(selected[i].id)
                        val.classList.remove('green')
                        val.classList.remove('blue')
                        val.classList.remove('red')
                        val.classList.add('yellow')
                        
                    }
                    clearSelected()
                    break;
                    
                default:
                }
                        
            }
                
            $('#wbsDrawingField').on('click', function(e) {
                refreshAllLinksXY()
                clearSelected()
            })
                
                
                
        }
                        
    })
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
})
                
  