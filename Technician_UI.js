var currentMasterIndex = null;

$(window).load(function () {
    
    //Page template
    var visualizationnSource   = $("#visualization").html();
    var visualizationTemplate = Handlebars.compile(visualizationnSource);
    
    //Set up data
    var visualizationContainer = $('#visualizationContainer');
    var visualizationData = createVisualizerFromRawData(visualizationRawData, visualizationTemplate, visualizationContainer);
    
    //Navigation menu template
    //var source   = $("#navigationMenu").html();
    //var template = Handlebars.compile(source);
    //var html    = template(moduleData);
    //$('#navContainer').prepend(html);
    
    //Render pages
    visualizationData.renderInitialPages();
    console.log(visualizationData)

    //Create the treeview navigation menu
    $('.treeview').each(function () {
        var tree = $(this);
        tree.treeview();
    });
    //Set max height of the tree view
    $('ul.treeview').css('max-height', $( window ).height()+'px');
    
    $(document).ready(function () {
        
        //set up the scrollspy
        //$('body').scrollspy({target: "#navScrollspy", offset: $(window).height()/2});
        //$('#navScrollspy').scrollspy("refresh");
        //
        //
        //$('#navScrollspy').on('activate.bs.scrollspy', function () {
        //    /*Runs when the scroll spy changes sections. Set ups the necessary pages*/
        //    
        //    
        //});
        //
        ////Resize things as necessary when the window resizes
        //$( window ).resize(function() {
        //});
        //
        ////Show or hide the navigation sidebar
        //$("#menu-toggle-left").click(function(e) {
        //    e.preventDefault();
        //    $("#wrapper").toggleClass("toggled-left");
        //    snapSection();
        //});
        //$("#menu-toggle-right").click(function(e) {
        //    e.preventDefault();
        //    $("#wrapper").toggleClass("toggled-right");
        //    snapSection();
        //});
    
        
    });
    
    snapSection();
    
    
});

snapSection = function(){
    /*Snaps the section with class currentSection to the top of the page*/
    if (hideImages == false) {
        $('html, body').stop();
        $('html, body').animate({
            scrollTop: $('.currentSection').offset().top-26
        }, 100);
    }
    
}

function VisualizerClass(visualizations) {
    /*Class for carrying around vislization data. Includes methods for rendering it*/
    var self = this;
    self.visualizations = visualizations;
    
    self.renderInitialPages = function(){
        /*Renders all the pages of the module*/
        
        self.visualizations.forEach(function(visualization){
            var html = visualization.render();
            console.log(html)
            $('#visualizationContainer').append(html)
            //visualization.swapHTML();
        });
        
    };
}

function VisualizationClass(ifframe, index, visualizationTemplate, emptyVisualizationTemplate){
    /*Class for an visualization page*/
    var self = this;
    
    self.ifframe = ifframe;
    self.index = index;
    self.visualizationTemplate = visualizationTemplate;
    self.emptyVisualizationTemplate = emptyVisualizationTemplate;
    self.HTML = null;
    
    self.render = function(){
        /*Renders the page according to the give pageTemplate*/
        self.HTML = self.visualizationTemplate(self);
        return self.HTML;
    };

    
    self.swapHTML = function(renderAbove){
        /*Swaps the existing hmtl with the current html*/
        //Save current scroll position and height
        var vizTarget = $('#viz'+self.index);
        var scrollPosition = $(document).scrollTop();
        var oldHeight = $(document).height();
        
        //Replace html
        vizTarget.replaceWith(self.pageHTML);
        
        //$('[data-spy="scroll"]').each(function () {
        //    var $spy = $(this).scrollspy('refresh');
        //});
        

        
    };
}

createVisualizerFromRawData = function(rawData, visualizationTemplate, emptyVisualizationTemplate){
    var visualizationList = [];
    rawData.forEach(function(visualizationData, i){
        var visualization = new VisualizationClass(visualizationData.ifframe, i, visualizationTemplate, emptyVisualizationTemplate);
        visualizationList.push(visualization);
    });
    var visualizer = new VisualizerClass(visualizationList);
    return visualizer
}

function containsObject(obj, list) {
    /*Checks if the given object is in the list*/
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i] === obj) {
            return true;
        }
    }

    return false;
}