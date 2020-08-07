// 推荐达人

export async function recommend(that) {
    const res = await that.$http.get(window.API_ROOT+'/user/getRecommendedPerson?latitude='+that.lat+'&longitude='+that.lng);
    if (res.data.code != 200) {
        that.$toast(res.data.msg);
    } 
    return res
}

// 首页标签
export async function getLabels(that) {
    const res = await that.$http.get(window.API_ROOT+'/label/getLabels?gender='+that.gender+'&labelType='+that.labelType);
    if (res.data.code != 200) {
        that.$toast(res.data.msg);
    } 
    return res
}
// 附近达人
export async function nearby(that) {
    const res = await that.$http.get(window.API_ROOT+'/user/nearByRecommendedPerson?labelId='+that.changeid+'&latitude='+that.lat+'&longitude='+that.lng);
    if (res.data.code != 200) {
        that.$toast(res.data.msg);
    } 
    return res
}