var util = require('../../utils/util.js');
let app = getApp();
var date = new Date();//变量声明 注意和下面的realdate区别
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Inf:[],
      nowTime: {
        nowDay : "",  
        nowDate: "",
        nowMonth: "",
        nowYear: ""
      },
      backgroundImg: ['../img/bj/b1.jpg', '../img/bj/b2.jpg', '../img/bj/b3.jpg', '../img/bj/b4.jpg', '../img/bj/b5.jpg'],
      choosenId : undefined,
      choosenTime : '',
      originInf : [],
      hasSortedInf: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    /*这里获取时间 */

    var day = date.getDay();
    var realdate = date.getDate();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;//不+1会少一个月
    day = util.formatDay(day);//获得自定义格式化星期大写
    this.setData({
      nowTime: {
        nowDay: day,
        nowDate: realdate,//真正的日期
        nowMonth: month,
        nowYear : year
      },
      choosenTime: year + '-' + month + '-' + realdate
    })
    // 请求活动信息
      this.requestAction();
      /***********/
      if(this.data.choosenId === undefined)//即第一次进入页面的时候,判断是否具有id，如果没有id则赋值为当前的时间序列
      {
        this.data.choosenId = ""+  year  + month + realdate ;
      }

      console.log(this.data.choosenId);
      // console.log(options.id);

      //下面是后端接口

      var that = this;


    // wx.request({
    //   url: 'http://148.70.73.191:4396/getAct',
    //   // data:{
    //   //   date_id : this.data.choosenId
    //   // //可能还有用户id 后期来决定
    //   // },
    //   header: {
    //     'content-type': 'json'
    //   },
    //   success: function (res) {
    //     console.log(res.data);
    //     that.setData({
    //       Inf: res.data
    //     });
    //     that.regExp();//先排序 排序做好准备 
    //     that.sortInf();//排序 产生初始排序数据
    //     that.sortInfSerious();// 排序 产生紧急事件排序数据
    //   }

    // });

       
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
      
  },

  // 进入页面请求活动信息
  requestAction(){
    let token = app.globalData.token;
    let that = this;
    wx.cloud.callFunction({
      name : "login",
      data : {
        $url : "actionInf",
        token : token
      }
    })
    .then(res => {
      let real_data = res.result;
      if(real_data.code === 500 || real_data.code === "500"){
        console.log("请求出错")
      }else{
        console.log(real_data);
        that.setData({
          Inf : real_data.data
        })
      }
    })
    .catch(err => {
      console.log(err);
    })
  },


  toGetMoreInf(res){
    console.log(res);
    var that = this;
    var actid = res.currentTarget.dataset.pageId;
    console.log(actid)
    wx.navigateTo({
      url: '../moreInf/moreInf?id='+actid,
    })
  },



  regExp(){
    var regexp = /\d+/g;
    
    this.data.Inf.forEach(function (x) {
      x.help = x.actTime.match(regexp);
      x.help = x.help[0] + x.help[1] + x.help[2];
    })
    console.log(this.data.Inf);
  
  
  },

  //按钮相应事件
  changeButton(res){
    console.log(res);
    debugger
    var that = this;
    debugger
    if(res.detail.value)//开启紧急情况
    {
      //排序算法
      console.log("nihao");
      console.log(this.data.hasSortedInf);
      debugger
      that.setData({
        Inf : this.data.hasSortedInf
      })
    }
    else{
      console.log("INF",this.data.originInf)
      that.setData({
        Inf : this.data.originInf
      })
      //排序排回去
      // sortBackInf();
    }
  },


  //开始排序
  sortInf(){
    var GetInf;
    GetInf = this.data.Inf.concat();
    GetInf.sort(function(value1,value2){
      if(value1.help < value2.help)
      {
        return -1;
      }
      else if (value1.help = value2.help)
      {
        return 0;
      }
      else if (value1.help > value2.help)
      {
        return 1;
      }
    });
    console.log("刚刚开始排序的数据: ",GetInf)
    this.setData({
      originInf: GetInf,
      Inf : GetInf
    })
    
  },

  sortInfSerious(){
    let helpInf;//为了防止源数据被伤害，拷贝一份。
    var realInf = [];//真正的数据存在这个数组里
    helpInf = this.data.originInf.concat();//这里不能直接赋值，否则数据连锁，采用数据深拷贝

    console.log("曾经的original:",this.data.originInf);
    // debugger
    var i = 0 ;
    for (var i = 0; i <= helpInf.length - 1; i++)
    {
      if( helpInf[i].isTop )
      {
        var helpYuansu = helpInf[i]; 
        if(i === 0 )//splice不能对头部使用
        {
            helpInf.shift();
        }
        else {
          helpInf.splice(i, i);//删除该元素
        }
        i--;
        realInf.push(helpYuansu);

      }
    };
    realInf = realInf.concat(helpInf);
    console.log("你好啊",realInf);
    console.log("查看INf",this.data.originInf)
    this.setData({
      hasSortedInf : realInf
    })
  }
//下面封印的是对应日历

  // jumpTo(e){//注意e的用法,event可以传值之类的
  //   let temNow = this.data.nowTime;//用一个临时变量来代替nowTime变量
  //   let choosenTime = e.detail.value;
  //   var timeOrder = String(temNow.nowYear) + temNow.nowMonth + temNow.nowDate;//定义出时间序列

  //   var regexp = /\d+/g;//正则匹配


  //   this.setData({
  //     choosenTime : choosenTime
  //   })

  //   choosenTime = choosenTime.match(regexp);
  //   choosenTime = choosenTime[0] + choosenTime[1] + choosenTime[2];//获取选定id

  //   console.log(choosenTime)

  //   this.setData({
  //     choosenId : choosenTime
  //   })
  //   this.refresh();//直接页面更新，不用跳转，否则麻烦
    
  // },

  // refresh(){//页面的更新
  // var that = this;
  // wx.request({
  //   url: '',
  //   data:{
  //     pageId : this.data.choosenId
  //   },
  //   success(res){
  //       that.setData({
  //         Inf : res.data
  //       })
  //   }

  // })
  // // 下面注释的为后端的逻辑 
  //   if (this.data.choosenId === "20191020") {
  //     console.log("你好")
  //     this.setData({
  //       Inf: [{
  //         actTime: "2019.10.19",
  //         actTitle: "成电讲坛",
  //         actIntro: "他一直致力于人工智能与脑科学的”跨界整合研发用意念控制的游戏延缓老年痴呆症探索大脑与音乐的不解之缘他是Roy John Award的首位亚洲获得者也是一名优秀的长江学者在定量脑电图和神经测量学有成就他就是我电教授尧德中，10月21日晚7：00，让他带我们一起走进国际化的视野",
  //         actPlace: "图书馆求实厅",
  //         pageId: 1
  //       }]
  //     })
  //   }
  //   else{
  //     this.setData({
  //       Inf:""
  //     })
  //   }
  // }
  
  //封印终点

})