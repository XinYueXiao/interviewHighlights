#   前序
前端小月月作者简介公交车,步行了N步后到达了面试公司  前端厂厂

前端小月月走到厂厂的前台接待处：您好,我是前端小月月,是来面试web前端开发岗位的

厂厂的前台说：你好，请做一下，我去给你叫面试官

前端小月月坐在等待区。。。。

------------


厂厂的前台对leader说：有个人来面试，你去面一下吧

leader说：好的

前端小月月看到一个拿着电脑的人朝自己走来，马上站起来说：你好

leader说：你好，请坐

（双双坐下）
------------
# 自我介绍
## leader说：`自我介绍`一下吧

前端小月月说：好的，我是来面试web前端岗位的，在之前的工作中，多使用react开发，有比较丰富的react开发经验，曾经独立完成过一个管理系统的项目，主要使用react全家桶进行开发，也曾担任过项目经理，负责公司官网的开发，鉴于要优化SEO，所以使用了next进行开发，公司内部有一些数据支持项目，接口比较复杂，使用过一段时间的typescript，其他项目大都是内部管理系统，比较倾向于业务。

leader说：你使用react开发，样式管理使用什么

前端小月月说：一般使用 ant design ，单独设计的样式会使用CSS3 自己写（开始给自己挖坑）
# 剧本之CSS场
## leader说：那你说说想要盒子`水平垂直居中`怎么实现

前端小月月说：这种需求在我之前的项目当中非常常见，刚开始的时候使用定位解决，后来随着CSS3的兴起，觉得Flex实现特别方便，尤其是在之前官网开发时在移动端使用起来也非常好，还有一种不常用的，是在看掘金的时候发现的，用display：table-cell也可以实现

> 如果是面试（笔试的话）https://github.com/XinYueXiao/interviewHighlights/tree/master/CSS/centerMiddle.html


## leader说：那你说说`CSS3盒模型有哪些`

前端小月月说:文档里一般说分为标准盒模型和IE盒模型,觉得应该还有`flex`弹性伸缩盒模型,`columns`多列布局盒模型
平时我们使用的是标准盒模型`box-sizing:content-box`是指的`width`和`height`的宽度并不是盒子的实际宽度,实际宽度还需要加上padding、margin、border,在实际应用中如果需要构建一个固定大小的盒子如果需要调整边距,还需要不停的调整盒子的宽高,比较麻烦,看了一些antd的项目的源码,会给盒子默认设置的box-sizing:border-box,调整边距就不会影响之前的布局了。

## leader问：那如果现在需要设计一个`左右固定，中间自适应`的布局怎么处理

前端小月月说：有兼容性要求的话可以使用float，定位实现，这两个需要结合`margin`设置位置，如果不考虑兼容性的话，用flex实现比较简单,直接设置最外层布局为`justify-content: space-between;`，设置左右盒子大小，中间盒子使用`flex:1`即可

> 如果是面试（笔试的话）https://github.com/XinYueXiao/interviewHighlights/tree/master/CSS/leftAndRight.html

## leader问：看你有移动端开发经验，说一下`移动端响应式布局的方案`吧

前端小月月说：主要是media 和 rem ,如果PC和移动使用一个页面，内容差不多使用media，如果是PC移动不一样则使用rem,在我的项目中官网的项目是使用的主页面设计不一样使用的是rem，有一些落地页PC和移动是一样的就是用的是media的方式。也可以结合flex和vh/vw等方式

## leader问：那你在使用css时，让一个div消失在视野中，怎么处理？

前端小月月说：需要看页面设计，如果消失后不占用原来div的位置可以使用简单的属性例如`display:none`，如果占用位置可以使用`visibility:hidden`、`transform: scale(0)`、`opacity:0`等,还有一些不常用的可以设置`width:0`，和`overflow:hidden`等

## leader问：请说明z-index的工作原理，适用范围

## 谈谈你对html5的理解