var currentMasterIndex = null;

$(window).load(function () {
    
    //Page template
    var visualizationnSource   = $("#visualization").html();
    var visualizationTemplate = Handlebars.compile(visualizationnSource);
    
    //Set up data
    var visualizationContainer = $('#visualizationContainer');
    var visualizer = createVisualizerFromRawData(visualizationRawData, visualizationTemplate, visualizationContainer);
    
    console.log(visualizer.visualizations)
    
    //Render pages
    visualizer.renderShown();
    
    $(document).ready(function () {
        
        //set up the scrollspy
        $('body').scrollspy({target: "#navScrollspy"});
        $('#navScrollspy').scrollspy("refresh");
        
        $('#titlesOnly').click(function(){
            $('.vizTitle').toggleClass('hide');
            $('.vizContainer').toggleClass('hide');
            
            $('[data-spy="scroll"]').each(function () {
                var $spy = $(this).scrollspy('refresh');
            });
        });
        
        $('#searchGraphsButton').click(function(){
            var searchText = $('#searchGraphs').val();
            var fuse = new Fuse(visualizer.visualizations, { keys: ["title"], threshold: 0.1 });
            var result = fuse.search(searchText);
            visualizer.shownVizualitzations = result;
            visualizer.renderShown();
            console.log(visualizer)
        })
        
        
        
        //Show or hide the navigation sidebar
        $("#menu-toggle-left").click(function(e) {
            e.preventDefault();
            $("#wrapper").toggleClass("toggled-left");
            $('#leftGlyph').toggleClass('glyphicon-minus');
            $('#leftGlyph').toggleClass('glyphicon-plus');
            $('#menu-toggle-left').toggleClass('menu-toggle-hidden');
            $('#menu-toggle-left').toggleClass('menu-toggle-show');
            
        });
        $("#menu-toggle-right").click(function(e) {
            e.preventDefault();
            $("#wrapper").toggleClass("toggled-right");
            $('#rightGlyph').toggleClass('glyphicon-minus');
            $('#rightGlyph').toggleClass('glyphicon-plus');
            $('#menu-toggle-right').toggleClass('menu-toggle-hidden');
            $('#menu-toggle-right').toggleClass('menu-toggle-show');
        });
    
        
    });
    
    //snapSection();
    
    
});

snapSection = function(){
    /*Snaps the section with class currentSection to the top of the page*/
    if (hideImages == false) {
        $('html, body').stop();
        $('html, body').animate({
            scrollTop: $('.currentSection').offset().top-37
        }, 100);
    }
    
}

function VisualizerClass(visualizations) {
    /*Class for carrying around vislization data. Includes methods for rendering it*/
    var self = this;
    self.visualizations = visualizations;
    self.shownVizualitzations = visualizations;
    
    var source   = $("#navigationMenu").html();
    self.navTemplate = Handlebars.compile(source);
    
    self.renderShown = function(){
        /*Renders all the pages of the module*/
        
        $('#navContainer').html('');
        var html = self.navTemplate(self);
        $('#navContainer').append(html);
        
        $('#visualizationContainer').html('');
        self.shownVizualitzations.forEach(function(visualization){
            var html = visualization.render();
            $('#visualizationContainer').append(html);
        });
        
        
        
    };
}

function VisualizationClass(title, ifframe, index, visualizationTemplate, emptyVisualizationTemplate){
    /*Class for an visualization page*/
    var self = this;
    
    self.title = title;
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
        

        
    };
}

createVisualizerFromRawData = function(rawData, visualizationTemplate, emptyVisualizationTemplate){
    var visualizationList = [];
    rawData.forEach(function(visualizer, i){
        var visualization = new VisualizationClass(visualizer.Title, visualizer.ifframe, i, visualizationTemplate, emptyVisualizationTemplate);
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