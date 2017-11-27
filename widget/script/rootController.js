/*
 * FrameName:mainFrame
 * Desc: 底部导航组件
 */

var rootFrame = function(o){
    this.main = $api.dom(o.main);
    this.footer = $api.dom(o.footer);
    this.apiName = o.apiName;
}

rootFrame.prototype = {
    init: function(){
        this.initRooter();
        this.initMainFrame();
        this.bindFooterEvent();
    },
    initRooter: function(){
        if(rootFrames.length==0) return;
        var _ul = '<ul class="flex-wrap">';
        for(var i = 0,len = rootFrames.length; i < len; i++){
            _ul+='<li tapmode="" class="flex-con '+((i==0)?'active':'')+'" >'+rootFrames[i].name+'</li>';
        }
        _ul+='</ul>';
        $api.html(this.footer,_ul);
    },
    initMainFrame : function(){
        var frames = [],
            i = 0,
            len = rootFrames.length;
        for(; i < len; i++){
            frames.push({
                name: rootFrames[i].frameName,
                url: rootFrames[i].page,
                bgColor: rootFrames[i].bgColor,
                bounces: true
            });
        }

        api.openFrameGroup({
            name: 'mainFrameGroup',
            scrollEnabled: true,
            rect: {
                x: 0,
                y: 0,
                w: api.winWidth,
                h: $api.dom('#main').offsetHeight
            },
            index: 0,
            frames: frames,
        },function(ret,err){
            if(err) $api.html($api.dom('#main'),err);
        });
    },
    bindFooterEvent: function(){
        var footerList = $api.domAll('#footer .flex-wrap li'),
            i = 0,
            len = footerList.length;
        for(;i<len;i++){
            $api.attr(footerList[i],'onClick',this.apiName+'.changeFrame('+i+')');
        }
    },
    changeFrame: function(i){
        api.setFrameGroupIndex({
            name: 'mainFrameGroup',
            index: i
        });
        
        if($api.domAll('#footer li')[i] == $api.dom('#footer li.active') ) {
            return;
        }
        var footList = $api.domAll('#footer li'),
            frames = [],
            j = 0,
            len = footList.length;
        for (; j < len; j++){
            $api.removeCls(footList[j], 'active');
        }
        $api.addCls(footList[i], 'active');
    }
}
