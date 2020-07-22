import qs from 'qs'
import axios from 'axios'
import { message } from 'antd';
export default function ajax(url, data, type) {
    let promise;
    // axios.defaults.headers.post['Content-Type'] = 'text/plain';

    console.log("api:"+data)
    return new Promise((resolve, reject) => {
        if (type === "GET") {
            promise = axios.get(url, {
                params: data
            })
        } else if (type === "POST"){
            promise = axios.post(url, qs.stringify(data))
            // promise = axios.post(url, data)
        }else if (type === "DELETE") {
            promise = axios.get(url)
        }

        promise.then(response => {
            resolve(response.data)
        }).catch(error => {
            reject(error);
            message.error("请求出错：" + error.msg);
            console.log(error.msg)
        })
    })

}