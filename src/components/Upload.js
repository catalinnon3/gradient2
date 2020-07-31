import React, { PureComponent } from 'react';
import '@vkontakte/vkui/dist/vkui.css';

export class Upload extends PureComponent {

    render() {
        let children = this.props.children;
        return (
            <div onClick = {()=> { this.upload__.click(); }}>
                <input accept='image/*' type='file' multiple={false} ref={(ref) => { this.upload__ = ref; }} style={{display: 'none'}} onChange={this.props.onChange}/>
                {children}
            </div>
        )
    }

}