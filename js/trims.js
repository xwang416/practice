/*
Author:Don Wanag
Email: xwang416@gmail.com
Last Update: Feb 2017
---------------------------------------*/

/**
 * This create a jquery plugin to define all the behaviours of selecing trims after a trim option button is clicked.
 */

var Drv = Drv || {};

Drv.selectTrims = (function($){
    
    "use strict";
    
    /**
    * Trims defines a funciton/class for user to select trims. it'll be called when the  trim option button is clicked.
    * when called, it creates an overlay panel, in which trim data is dynamically fetched from localStorage/cookie/ajax call (TBD)
    * based on yearMakeModel obj, and then renders the trim options in a list. after closing the overlay panel, user's selection
    * for trims will be reflected both in cookie/localStorage and page (trims button or TBD).
    * @yearMakeModel - object, e.g. {year:'2017', make:'acura', model:'ilx'}, used to fetch available trims
    * @trimOptionBtn - jQuery element, click this button will invoke this function
    */
    function Trims( yearMakeModel, trimOptionBtn ){
        
        this.trimOptionBtn = trimOptionBtn;
        this.yearMakeModel = yearMakeModel; 
        this.overlay = this.createOverlay();
    }
    
    Trims.prototype.createOverlay = function(){
        
        var overlay = $('#trim-overlay');
        
        if( overlay.length < 1 ){
            overlay = $('<div>', {'id':'trim-overlay', 'class':'trim-overlay active'}).appendTo('body');
        }
        else{
            overlay.remove();
            overlay = $('<div>', {'id':'trim-overlay', 'class':'trim-overlay active'}).appendTo('body');
        }
        
        this.buildTrimListPanel( overlay );

        return overlay;
    };
    
    Trims.prototype.buildTrimListPanel = function(overlay){

        var ul = $('<ul>', {'class':'panel-column-labels'}).append(
                    $('<li>', {'class':'column-label add-col'}).text('add'),
                    $('<li>', {'class':'column-label image-col'}).html("&nbsp;"),
                    $('<li>', {'class':'column-label trim-name-col'}).text('trim'),
                    $('<li>', {'class':'column-label msrp-col desc'}).append(
                        $('<span>').text('mrsp'),
                        $('<span>', {'class':'menu-arrow'})
                    )
                );
        
        if( !Postmedia.Properties.isMobile ){
            ul.append(
                $('<li>', {'class':'column-label bodystyle-col'}).text('body style'),
                $('<li>', {'class':'column-label seating-col'}).text('seating')
            );
        }
        
        var panel = $('<div>', {'class':'trim-panel'}).append(
            $('<div>', {'class':'panel-header'}).append(
                $('<div>', {'class':'year-make-model-title'}).append(
                    $('<span>').text('2017 Acura iLx')
                ),
                $('<div>', {'class':'close-btn'}),
                ul
            ),
            $('<div>', {'id':'trim-panel-body', 'class':'panel-body'}),
            $('<div>', {'class':'panel-footer'}).append(
                $('<button>', {'class':'trim-panel-btn pick-compare'}).text('Pick One More'),
                $('<button>', {'class':'trim-panel-btn continue-searching'}).text('Continue Searching')
            )
        );
        
        overlay.append( panel );
        this.renderTrims( overlay );
    };
    
    //get trim data (json) based on yearMakeModel
    Trims.prototype.getTrims = function( yearMakeModel ){
        
        //this trims json data will get from backend via localStorage/cookie or a direct ajax call
        //here just a hardcode

         var trims = { 'trims' : [
            { 'imgSrc' : 'http://app.canada.com/chrome/get.svc/image/389737?resize=compare:search', 
              'imgAlt' : '2017 Nissan Micra 4dr Base', //this may be a string of year+make+mode+trim
              'trimName' : '4dr Base',
              'msrp' : '$9,980',
              'bodystyle' : 'Sedan',
              'seating' : '5',
              'id' : '333000',
              'year' : '2017',
              'make' : 'acura',
              'model': 'ilx'
              
            },
            { 'imgSrc' : 'http://app.canada.com/chrome/get.svc/image/389737?resize=compare:search', 
              'imgAlt' : '2017 Nissan Micra 4dr HB Man S', //this may be a string of year+make+mode+trim
              'trimName' : '4dr HB Man S',
              'msrp' : '$10,800',
              'bodystyle' : 'Sedan',
              'seating' : '5',
              'id' : '333001',
              'year' : '2017',
              'make' : 'acura',
              'model': 'ilx'
            },
            { 'imgSrc' : 'http://app.canada.com/chrome/get.svc/image/389737?resize=compare:search', 
              'imgAlt' : '2017 Nissan Micra 4dr HB Man SV', //this may be a string of year+make+mode+trim
              'trimName' : '4dr HB Man SV',
              'msrp' : '$13,900',
              'bodystyle' : 'Sedan',
              'seating' : '5',
              'id' : '333002',
              'year' : '2017',
              'make' : 'acura',
              'model': 'ilx'
            },
            { 'imgSrc' : 'http://app.canada.com/chrome/get.svc/image/389737?resize=compare:search', 
              'imgAlt' : '2017 Nissan Micra 4dr HB CVT ES', //this may be a string of year+make+mode+trim
              'trimName' : '4dr HB CVT ES',
              'msrp' : '$14,900',
              'bodystyle' : 'Sedan',
              'seating' : '5',
              'id' : '333003',
              'year' : '2017',
              'make' : 'acura',
              'model': 'ilx'
            },
            { 'imgSrc' : 'http://app.canada.com/chrome/get.svc/image/389737?resize=compare:search', 
              'imgAlt' : '2017 Nissan Micra 4dr Auto LT', //this may be a string of year+make+mode+trim
              'trimName' : '4dr Auto LT',
              'msrp' : '$15,980',
              'bodystyle' : 'Sedan',
              'seating' : '5',
              'id' : '333004',
              'year' : '2017',
              'make' : 'acura',
              'model': 'ilx'
            },
            { 'imgSrc' : 'http://app.canada.com/chrome/get.svc/image/389737?resize=compare:search', 
              'imgAlt' : '2017 Nissan Micra 4dr Auto SS', //this may be a string of year+make+mode+trim
              'trimName' : '4dr Auto SS',
              'msrp' : '$17,500',
              'bodystyle' : 'Sedan',
              'seating' : '5',
              'id' : '333005',
              'year' : '2017',
              'make' : 'acura',
              'model': 'ilx'
            },
            { 'imgSrc' : 'http://app.canada.com/chrome/get.svc/image/389737?resize=compare:search', 
              'imgAlt' : '2017 Nissan Micra 4dr Auto Hybrid', //this may be a string of year+make+mode+trim
              'trimName' : '4dr Auto AWD Hybrid Sport Tech Pkg',
              'msrp' : '$19,900',
              'bodystyle' : 'Sedan',
              'seating' : '5',
              'id' : '333006',
              'year' : '2017',
              'make' : 'acura',
              'model': 'ilx'
            },
            { 'imgSrc' : 'http://app.canada.com/chrome/get.svc/image/389737?resize=compare:search', 
              'imgAlt' : '2017 Nissan Micra 4dr Auto Hybrid', //this may be a string of year+make+mode+trim
              'trimName' : '4dr Auto AWD Hybrid Sport Tech Pkg',
              'msrp' : '$19,900',
              'bodystyle' : 'Sedan',
              'seating' : '5',
              'id' : '333016',
              'year' : '2017',
              'make' : 'acura',
              'model': 'ilx'
            },
            { 'imgSrc' : 'http://app.canada.com/chrome/get.svc/image/389737?resize=compare:search', 
              'imgAlt' : '2017 Nissan Micra 4dr Auto Hybrid', //this may be a string of year+make+mode+trim
              'trimName' : '4dr Auto AWD Hybrid Sport Tech Pkg',
              'msrp' : '$19,900',
              'bodystyle' : 'Sedan',
              'seating' : '5',
              'id' : '333026',
              'year' : '2017',
              'make' : 'acura',
              'model': 'ilx'
            },
            { 'imgSrc' : 'http://app.canada.com/chrome/get.svc/image/389737?resize=compare:search', 
              'imgAlt' : '2017 Nissan Micra 4dr Auto Electric', //this may be a string of year+make+mode+trim
              'trimName' : '4dr Auto Electric',
              'msrp' : '$24,900',
              'bodystyle' : 'Sedan',
              'seating' : '5',
              'id' : '333007',
              'year' : '2017',
              'make' : 'acura',
              'model': 'ilx'
            }
        ] };
        
        return trims;
    };
    
    //build trim list
    Trims.prototype.renderTrims = function( overlay ){
        
        var trims = this.getTrims( this.yearMakeModel );
        var trimList = $('<ul>', {'class':'trim-list'});
        
        for(var i=0, len=trims.trims.length; i<len; i++){
            var trim = trims.trims[i];
            var trimListItem = this.buildTrimListItem(trim);
            trimList.append(trimListItem);
        }
        
        overlay.find('.panel-body').empty().append( trimList );
        this.addListeners( overlay );
    };
    
    Trims.prototype.buildTrimListItem = function(trim){
        
        var item = $('<li>', {'class':'trim-list-item'});
        var ul = $('<ul>');
        
        ul.append(
            $('<li>', {'class':'add-col'}).append(
                $('<input>', {'type':'checkbox', 'id':trim.id, 'name':'compare_'+trim.id, 'value':trim.id, 'data-body-type':trim.bodystyle, 'data-make':trim.make, 'data-model':trim.model, 'data-image':trim.imgSrc, 'data-title':trim.year+' '+trim.make+' '+trim.model, 'data-trim':trim.trimName, 'data-model-url':'', 'data-review-url':'' }),
                $('<label>', {'for':trim.id})
            ),
            $('<li>', {'class':'image-col'}).append( $('<figure>').append(
                    $('<img>', {'src':trim.imgSrc, 'data-lazy-src':trim.imgSrc, 'alt':trim.year+' '+trim.make+' '+trim.model+' '+trim.trimName})
                )
            ),
            $('<li>', {'class':'trim-name-col'}).append( $('<span>').text( trim.trimName ) ),
            $('<li>', {'class':'msrp-col'}).append( $('<span>').text( trim.msrp ) )
            
        );
            
        if( !Postmedia.Properties.isMobile ){
            ul.append(
                $('<li>', {'class':'bodystyle-col'}).append( $('<span>').text( trim.bodystyle ) ),
                $('<li>', {'class':'seating-col'}).append( $('<span>').text( trim.seating ) )
            );
        }
;
        item.append(ul);
        
        return item;
        
    };
    
    Trims.prototype.addListeners = function( overlay ){
        
        var pickCompareBtn = overlay.find('.pick-compare');
        var that = this;
        
        overlay.on('click', 'input:checkbox', function(e){
            
            var boxesChked = overlay.find('input:checkbox:checked');
            var count = boxesChked.length;
            
            if(count > 1){
                pickCompareBtn.removeClass('pick-one-more').addClass('compare-now');
            }
            else if(count > 0){
                pickCompareBtn.removeClass('compare-now').addClass('pick-one-more');
            }
            else{
                pickCompareBtn.removeClass('pick-one-more compare-now');
            }
            
            //demo only
            var trimsSlected = [];
            boxesChked.each( function(i, el){
                trimsSlected.push( '\nid '+$(this).attr('id')+': '+$(this).data('title')+' '+$(this).data('trim') );
            });
            console.log('\nTrims selected: \n-------------------------------'+trimsSlected);
       
        });
        
        overlay.on('click', '.close-btn', function(e){
            that.countTrimsSelected();
            overlay.removeClass('active');
        });
        
        overlay.on('click', '.continue-searching', function(e){
            that.countTrimsSelected();
            overlay.removeClass('active');
        });
        
        //toggle trim list shadow - begin
        var panelBody = $('#trim-panel-body'),
            list = panelBody.find('.trim-list'),
            listItems = list.find('>li'),
            listContainerHeight = list.outerHeight(),
            listItemHeight = listItems.outerHeight(),
            listHeight = listItemHeight * listItems.length;
        
        if(listContainerHeight <= listHeight){
            panelBody.addClass('has-shadow');
         }

        $(window).on('scroll', function(e){
            
            var offset = listItems.position().top;
            
            if(listContainerHeight - offset < listHeight - 20){
                panelBody.addClass('has-shadow');
            }
            else{
                panelBody.removeClass('has-shadow');
            }
        });
        //toggle trim list shadow - end
        
        //msrp sorting
        overlay.find('.column-label.msrp-col').on('click', function(e){
            $(this).toggleClass('desc');
        });
    };
    
    Trims.prototype.countTrimsSelected = function(){
        
        var trimCount = 0;
        trimCount = this.overlay.find('input:checkbox:checked').length;
        
        if(trimCount > 0){
            this.trimOptionBtn.addClass('some').find('.trim-num').text('Trim ('+ trimCount +')');
        }
        else{
            this.trimOptionBtn.removeClass('some').find('.trim-num').text('Trim');
        }

    };
        
//    $.extend({
//        compareTrims : function( yearMakeModel ) {
//            // plugin code
//            var trimPanel = new Trims( yearMakeModel );
//        }
//    });
    $.fn.compareTrims = function( yearMakeModel ) {
            // plugin code
            var trimPanel = new Trims( yearMakeModel, $(this) );
    }

}(jQuery));



//When document ready, run the followings
jQuery(function(){

    //init trim options on load and each time filter change (ajax call with filter changing)
    $('.trim-options').on('click', function(e){
        $(this).compareTrims({});
    });
    
    //init trim options on filter changing (ajax call with filter changing)
    $(document).ajaxComplete(function(){
        $('.trim-options').on('click', function(e){
            $(this).compareTrims({});
        });
    });

});