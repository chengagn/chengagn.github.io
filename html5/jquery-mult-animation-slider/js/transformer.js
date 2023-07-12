/*
 * Radar: A Image slider plugin
 * Developed by: Md Rakibulalam
 * Country: Bangladesh
 * Contact: email: rakibulalambd@gmail.com, cell: +88-01722488810, skype:rakibulalam
 * Contribute: https://github.com/rakibulalam/transformer.js.git
 *
 * @license: MIT license: http://opensource.org/licenses/MIT
 *
 */
(function($) {
    $.fn.transformer = function(options) {

        var __Settings = {
            __Effects: new Array('Optimus', 'Ironhide', 'Scorponok', 'Megatron', 'Starscream', 'Jazz'),
            __Columns: 7,
            __Rows: 3,
            __Speed: 10000,
            __Title_Height: 150,
            __Title_Width: 0,
        }

        return this.each(function() {
            if (options) {
                $.extend(__Settings, options);
            }

            var __obj_element = this;
            var __img_src_array = new Array();
            var __title_content_array = new Array();
            var __event_checker = false;
            var __child_mask_id = 1;
            var __parent_id = 1;
            var __child_class_id = 1;
            var __effects_counter_id = 0;

            jQuery.fx.interval = 20;

            $(window).load(function() {
                __ShowLoader();
                __InitLoader();
                __S_S_An()
            });
            var __ShowLoader = function() {
                $(__obj_element).parent().append('<div id="loader"></div>');
                $('#loader').show()
            };
            var __HideLoader = function() {
                $(__obj_element).parent().find('#loader').fadeOut().remove();
                $(__obj_element).children('DIV').show()
            };
            var __InitLoader = function() {
                $(__obj_element).children('DIV').each(function() {
                    $(this).addClass('js_transformer-' + __child_class_id);
                    __img_src_array[__child_class_id] = $(this).find('img').attr('src');
                    __title_content_array[__child_class_id] = $(this).find('p').css({
                        "position": "absolute",
                        "z-index": "-1"
                    }).html();
                    $(this).find('p').remove();
                    $(this).find('img').css({
                        "position": "absolute",
                        "z-index": "-1"
                    });
                    __child_class_id++
                })
            };
            var __C_M_Bx = function(__Ix, __Height, __Width, __IMG_Left, __IMG_Top, __Mask_Left, __Mask_Top) {
                $(".js_transformer-" + (__Ix) + "").append('<div class=js_mask-' + (__child_mask_id) + '></div>');
                $('.js_mask-' + (__child_mask_id) + '').css({
                    "margin-left": "" + __Mask_Left + "px",
                    "margin-top": "" + __Mask_Top + "px",
                    "height": "" + __Height + "px",
                    "width": "" + __Width + "px",
                    "background": "URL(" + __img_src_array[__Ix] + ") no-repeat",
                    "background-position": "" + __IMG_Left + "px " + __IMG_Top + "px",
                    "position": "absolute",
                    "float": "left",
                    "z-index": "200"
                }).hide();
                __child_mask_id++
            };
            var __C_M_T_B = function(__Ix) {
                $(".js_transformer-" + (__Ix) + "").append('<div class="js_title"></div>');
                $(".js_transformer-" + (__Ix) + "").append('<div class="js_title_content">' + __title_content_array[__Ix] + '</div>');
                $(".js_title_content").css({
                    "margin-left": "0px",
                    "margin-top": "" + __Get_Title_Top_Margin() + "px",
                    "height": "" + __Settings.__Title_Height + "px",
                    "width": "" + __Get_Title_Left_Margin() + "px",
                    "position": "absolute",
                    "float": "left",
                    "z-index": "400"
                }).hide();
                $(".js_title").css({
                    "margin-left": "0px",
                    "margin-top": "" + __Get_Title_Top_Margin() + "px",
                    "height": "" + __Settings.__Title_Height + "px",
                    "width": "" + __Get_Title_Left_Margin() + "px",
                    "background": "black",
                    "position": "absolute",
                    "float": "left",
                    "opacity": "0.5",
                    "z-index": "300"
                }).hide()
            };
            var __Get_Mask_Height = function() {
                return Math.ceil($(__obj_element).height() / __Settings.__Rows)
            };
            var __Get_Mask_Width = function() {
                return Math.ceil($(__obj_element).width() / __Settings.__Columns)
            };
            var __Get_Title_Top_Margin = function() {
                return Math.round($(__obj_element).height() - __Settings.__Title_Height)
            };
            var __Get_Title_Left_Margin = function() {
                if (__Settings.__Title_Width == 0) {
                    return Math.round($(__obj_element).width())
                } else {
                    return Math.round($(__obj_element).width() - __Settings.__Title_Width)
                }
            };
            var __Z_Index_Changer = function(__Ix) {
                var __Z_Index_Id = 0;
                $(__obj_element).children().each(function() {
                    $(this).css({
                        'z-index': '' + __Z_Index_Id + ''
                    });
                    __Z_Index_Id++
                });
                if (__Ix == 1) {
                    $(".js_transformer-" + (__Ix) + "").children().removeAttr('src').attr('src', '' + __img_src_array[$(__obj_element).children().length] + '')
                } else {
                    $(".js_transformer-" + (__Ix) + "").children().removeAttr('src').attr('src', '' + __img_src_array[__Ix - 1] + '')
                }
                $(".js_transformer-" + (__Ix) + "").css({
                    'z-index': '100'
                })
            };
            var __Create_Mask_Factory = function(__Ix) {
                var __Get_Mask_Top = 0;
                var __Get_Mask_Left = 0;
                for (var j = 1; j <= __Settings.__Rows; j++) {
                    for (var i = 1; i <= __Settings.__Columns; i++) {
                        __C_M_Bx(__Ix, __Get_Mask_Height(), __Get_Mask_Width(), -__Get_Mask_Left, -__Get_Mask_Top, __Get_Mask_Left, __Get_Mask_Top);
                        __Get_Mask_Left = (__Get_Mask_Left + __Get_Mask_Width())
                    }
                    __Get_Mask_Left = 0;
                    __Get_Mask_Top = (__Get_Mask_Top + __Get_Mask_Height())
                }
                __child_mask_id = 1
            };
            var __Remove_Mask_Box = function(__Ix) {
                if (__event_checker) {
                    if (__Ix == 1) {
                        $(".js_transformer-" + ($(__obj_element).children().length) + "").children('DIV').remove()
                    } else {
                        $(".js_transformer-" + (__Ix - 1) + "").children('DIV').remove()
                    }
                } else {
                    __event_checker = true
                }
            };
            var __M_A_F = function(__Ix) {
                __Z_Index_Changer(__Ix);
                __Remove_Mask_Box(__Ix);
                __C_M_T_B(__Ix);
                __Create_Mask_Factory(__Ix);
                var __Children_Length_Id = 0;
                var __Per_Mask_InterVal_Speed = Math.round(((__Settings.__Speed / 2) / $('.js_transformer-' + __Ix).children('DIV').length) / 2);
                var __Middle_Frame = Math.round($(__obj_element).children().length / 2);
                var __End_Frame = __Settings.__Rows * __Settings.__Columns * 3;
                var __Effect_Name = __Effects_Maker();
                var __Interval = setInterval(function() {
                    try {
                        __A_E_F(__Effect_Name, __Children_Length_Id);
                        if (__Children_Length_Id == __End_Frame) {
                            clearInterval(__Interval)
                        }
                        __C_T_An(__Children_Length_Id, 1, __Middle_Frame, __End_Frame);
                        __Children_Length_Id++
                    } catch (ex) {}
                }, __Per_Mask_InterVal_Speed)
            };
            var __Effects_Maker = function() {
                var __Effect_Name = __Settings.__Effects[__effects_counter_id];
                if (__effects_counter_id == __Settings.__Effects.length) {
                    __effects_counter_id = 0
                }
                __effects_counter_id++;
                return __Effect_Name
            };
            var __A_E_F = function(__Effect_Name, __Childe_Id) {
                switch (__Effect_Name) {
                    case 'Optimus':
                        $('.js_mask-' + __SpecialEffects_Boxer(__Childe_Id, 'Right')).animate({
                            width: 'toggle',
                            height: 'toggle',
                            left: '-=100',
                            opacity: '0.5',
                            top: '+=50'
                        }, 200);
                        $('.js_mask-' + __SpecialEffects_Boxer(__Childe_Id, 'Right')).animate({
                            left: '+=100',
                            opacity: '1',
                            top: '-=50'
                        }, 200);
                        break;
                    case 'Ironhide':
                        $('.js_mask-' + __Childe_Id).animate({
                            width: 'toggle',
                            height: 'toggle',
                            left: '+=50'
                        }, 200);
                        $('.js_mask-' + __Childe_Id).animate({
                            left: '-=50'
                        }, 200);
                        break;
                    case 'Scorponok':
                        $('.js_mask-' + __Childe_Id).animate({
                            width: 'toggle',
                            height: 'toggle',
                            left: '-=50'
                        }, 200);
                        $('.js_mask-' + __Childe_Id).animate({
                            left: '+=50'
                        }, 200);
                        break;
                    case 'Megatron':
                        $('.js_mask-' + __Childe_Id).slideDown(100);
                        $('.js_mask-' + __Childe_Id).animate({
                            top: '-=50'
                        });
                        $('.js_mask-' + __Childe_Id).animate({
                            top: '+=50'
                        });
                        break;
                    case 'Jazz':
                        $('.js_mask-' + __Childe_Id).show(200);
                        $('.js_mask-' + __Childe_Id).animate({
                            top: '+=100'
                        });
                        $('.js_mask-' + __Childe_Id).animate({
                            top: '-=100'
                        });
                        break;
                    case 'Starscream':
                        $('.js_mask-' + __SpecialEffects_Boxer(__Childe_Id, 'Left')).slideUp();
                        $('.js_mask-' + __SpecialEffects_Boxer(__Childe_Id, 'Left')).slideDown();
                        break;
                    default:
                        $('.js_mask-' + __SpecialEffects_Boxer(__Childe_Id, 'Left')).animate({
                            width: 'toggle',
                            height: 'toggle',
                            left: '+=100',
                            top: '-=50'
                        }, 200);
                        $('.js_mask-' + __SpecialEffects_Boxer(__Childe_Id, 'Left')).animate({
                            left: '-=100',
                            top: '+=50'
                        }, 200);
                        break
                }
            };
            var __SpecialEffects_Boxer = function(__id, __Mode) {
                var __boxer = new Array();
                var __animat_array = new Array();
                var __start_index = 1;
                var __boxerInex = 1;
                for (var i = 1; i <= __Settings.__Rows; i++) {
                    __boxer[i] = new Array(__Settings.__Columns);
                    var __resset_index = 1;
                    for (var j = __start_index; j <= (__Settings.__Columns + __start_index); j++) {
                        __boxer[i][__resset_index] = j;
                        __resset_index++
                    }
                    __boxer[i].reverse();
                    __start_index = __start_index + __Settings.__Columns
                }
                if (__Mode == 'Right') {
                    for (var k = 1; k <= __Settings.__Columns; k++) {
                        for (var s = (__Settings.__Rows); s >= 1; s--) {
                            __animat_array[__boxerInex] = __boxer[s][k];
                            __boxerInex++
                        }
                    }
                    return __animat_array[__id]
                } else if (__Mode == 'Left') {
                    for (var k = 1; k <= __Settings.__Columns; k++) {
                        for (var s = 1; s <= __Settings.__Rows; s++) {
                            __animat_array[__boxerInex] = __boxer[s][k];
                            __boxerInex++
                        }
                    }
                    return __animat_array[__id]
                } else if (__Mode == "Array") {
                    return __boxer
                }
            };
            var __Clean_Undefine_Array = function(__Cleaner_Array) {
                var __New_Array = new Array();
                for (var i = 0; i < __Cleaner_Array.length; i++) {
                    if (__Cleaner_Array[i] != undefined) {
                        __New_Array[i] = __Cleaner_Array[i]
                    }
                }
                return __New_Array
            };
            var __C_T_An = function(__Frames, __Start_Frame, __Middle_Frame, __End_Frame) {
                if (__Frames == __Start_Frame) {
                    $('.js_title').animate({
                        top: '+=' + __Settings.__Title_Height
                    });
                    $('.js_title_content').animate({
                        top: '+=' + (__Settings.__Title_Height + 10)
                    })
                } else if (__Frames == __Middle_Frame) {
                    $('.js_title').animate({
                        height: 'toggle',
                        top: '-=' + __Settings.__Title_Height
                    });
                    $('.js_title_content').animate({
                        height: 'toggle',
                        top: '-=' + (__Settings.__Title_Height + 10)
                    })
                } else if (__Frames == __End_Frame) {
                    $('.js_title_content').fadeOut(function() {
                        $('.js_title_content').animate({
                            top: '+=' + __Settings.__Title_Height
                        })
                    }, function() {
                        $('.js_title').fadeOut(function() {
                            $('.js_title').animate({
                                top: '+=' + __Settings.__Title_Height
                            })
                        })
                    })
                }
            };
            var __S_S_An = function() {
                var __Start_InterVal = setInterval(function() {
                    __HideLoader();
                    __M_A_F(__parent_id);
                    if (($(__obj_element).children().length) == __parent_id) {
                        __parent_id = 1;
                        clearInterval(__Start_InterVal);
                        __S_S_An()
                    } else {
                        __parent_id++
                    }
                }, __Settings.__Speed, function() {})
            };


        });
    };
})(jQuery);