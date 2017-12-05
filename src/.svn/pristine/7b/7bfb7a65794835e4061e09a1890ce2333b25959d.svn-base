//k线图数据
export class KDatas{
  createDb() {
    const kDatas =[
      ["2015/12/25", "3614.05", "3627.91", "3601.74", "3635.26"],
      ["2015/12/28", "3635.77",  "-2.59%", "3533.78", "3641.59" ],
      ["2015/12/29", "3528.4", "3563.74", "3515.52", "3564.17" ],
      ["2015/12/30", "3566.73", "3572.88",  "3538.11", "3573.68"],
      ["2015/12/31", "3570.47", "3539.18", "3538.35", "3580.6"],
  ];
    var dates = kDatas.map(function(item){
      return item[0];
    });
    var data = kDatas.map(function(item){
      return [+item[1], +item[2], +item[3], +item[4]];
    });
    return {
      dates:dates,
      data:data
    };
  }
}
