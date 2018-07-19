/**
 * Created by Tirion on 2017/11/7.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cns from 'classnames';

export default class NumRoll extends Component {
    static propTypes = {
        from: PropTypes.number.isRequired,  // 开始数字
        to: PropTypes.number.isRequired,  // 结束数字
        duration: PropTypes.number.isRequired,  // 总滚动时长
        ease: PropTypes.bool,  // 是否减速
        toFixed: PropTypes.number  // 小数位数
    };

    state = {
        num: 0
    };

    from = this.props.from;  // 起始值
    to = this.props.to;  // 终点值
    current = this.props.from;  // 当前数值
    allCount = 0;  // 总共需要增加的次数
    count = 0;  // 当前增加的次数
    step = 1;  // 每次增加的值
    toFixed = this.props.toFixed || 0;  // 保留小数位数
    ease = this.props.ease || false;  // 是否减速

    componentDidMount() {
        let { duration } = this.props;
        
        const { num } = this.state;
        this.setState({
            num: this.current
        });

        // 计算每次增加的间隔时间
        let interval = duration / (this.to - this.from);
        // 如果间隔时间小于20ms，则需要设置为20ms，这时候也要修改递增的值
        if (interval < 20) {
            this.step = Number((20 / interval).toFixed(this.toFixed));
            this.allCount = Number.parseInt(this.to / this.step, 10);
            // 由于数值计算小数点的误差以及 setTimeout 的误差，所以这里降低间隔时间减小误差
            interval = 20;
        } else {
            this.allCount = this.to - this.from;
        }
        console.time();

        this.roll(interval);
    }

    roll = (interval) => {
        // 最后20次速度逐渐减慢
        if (this.ease) {
            this.count++;
            const residue = this.allCount - this.count;
            if (residue < 20) {
                interval += 10;
            }
        }

        setTimeout(() => {
            this.current = Number(Number.parseFloat(this.current + this.step).toFixed(this.toFixed));
            const { num } = this.state;
            if (this.current < this.to) {
                this.setState({
                    num: this.current
                });
                this.roll(interval);
            } else {
                this.setState({
                    num: this.to
                });
                console.timeEnd();
            }
        }, interval);
    };

    render() {
        const { num } = this.state;
        return (
            <span className={this.props.className} key={num} style={{ ...this.props.style }}>{num}</span>
        );
    }
}
