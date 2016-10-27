import * as React from "react";
import * as Model from '../domain/model';
import * as Slider from 'react-slick';

interface IProps {
    images: string[]
}

interface IState {
    openindex?: number
}

class LeftNavButton extends React.Component<{}, {}> {
    render() {
        return <button {...this.props}>Next</button>
    }
}

class RightNavButton extends React.Component<{}, {}> {
    render() {
        return <button {...this.props}>Next</button>
    }
}

export class ImageCSVSlider extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.openModal.bind(this);
        this.closeModal.bind(this);
    }

    openModal(index: number) {
        this.setState({ openindex: index });
    }
    closeModal() {
        this.setState({ openindex: null });
    }
    render() {

        if (!this.props.images || this.props.images.length < 1)
            return null;
        var wrapperstyle = {
            width: "600px",
            padding: "20px 20px 40px 20px",
            margin: "20px"
        };
        var itemstyle = {
            cursor: "pointer"
        }
        var settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            pauseOnHover: true,
            adaptiveHeight: true      
        };
        var modalstyle = {
            overlay: {
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(53, 53, 53, 0.75)'
            },
            content: {
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',

                transform: 'translate(-50%, -50%)'
            }
        }
        var self = this;
        return (
            <div style={wrapperstyle} >
                <div>
                    <Slider {...settings}>
                        {this.props.images.map(function (img, index) {
                            var isopen = self.state ? self.state.openindex == index : false;
                            return (
                                <div onClick={() => self.openModal(index)} style={itemstyle} key={index}>
                                    <img src={img} className="carouselimg" />
                                </div>
                            )
                        })}
                    </Slider>
                </div>
            </div>);
    }
}