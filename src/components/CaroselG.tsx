"use client";
/* eslint-disable @next/next/no-img-element */
import React, { Component, createRef } from "react";
import Slider from "react-slick";
import { VscVerifiedFilled } from "react-icons/vsc";
import { FaMapMarkerAlt } from "react-icons/fa";
import Link from "next/link";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

interface Profile {
  nome: string;
  photos: string[];
  cidade: string;
  certificado: boolean;
}

interface CarouselGProps {
  profiles: Profile[];
}

interface CarouselGState {
  slidesToShow: number;
}

class CarouselG extends Component<CarouselGProps, CarouselGState> {
  private sliderRef = createRef<Slider>();

  constructor(props: CarouselGProps) {
    super(props);
    this.state = {
      slidesToShow: 9, // Valeur initiale pour les grands écrans
    };
  }

  componentDidMount() {
    this.adjustSlidesToShow();
    window.addEventListener("resize", this.adjustSlidesToShow);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.adjustSlidesToShow);
  }

  adjustSlidesToShow = () => {
    const mqLarge = window.matchMedia(
      "(min-width: 1440px) and (min-resolution: 2dppx)"
    );
    const mqMedium = window.matchMedia(
      "(min-width: 1024px) and (min-resolution: 2dppx)"
    );
    if (mqLarge.matches) {
      this.setState({ slidesToShow: 7 });
    } else if (mqMedium.matches) {
      this.setState({ slidesToShow: 7 }); // Ajustement pour MacBooks de 13'' et similaires
    } else {
      this.setState({ slidesToShow: 9 });
    }
  };

  handleClick = (direction: "next" | "prev") => {
    if (this.sliderRef.current) {
      direction === "next"
        ? this.sliderRef.current.slickNext()
        : this.sliderRef.current.slickPrev();
    }
  };

  render() {
    const { profiles } = this.props;
    const { slidesToShow } = this.state;

    const settings = {
      dots: true,
      infinite: true,
      speed: 1000,
      slidesToShow: slidesToShow,
      slidesToScroll: 3,
      vertical: false,
      responsive: [
        {
          breakpoint: 768, // Paramètres pour les dispositifs avec un écran jusqu'à 768 pixels
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          },
        },
      ],
    };

    return (
      <div className="relative w-full mt-4 md:mt-24">
        <Slider ref={this.sliderRef} {...settings} className="">
          {profiles.map((profile, index) => (
            <div key={index} className="px-2">
              <div className="relative ">
                <Link href={`/escort/${profile.nome}`}>
                  <Image
                    src={profile.photos[0] || "/logo.webp"}
                    alt={profile.nome}
                    className="w-full h-52 md:h-72 object-cover transition duration-300 ease-in-out transform hover:scale-105 bg-pink-200 hover:bg-pink-800 hover:opacity-50 rounded-xl"
                    priority
                    width={100}
                    height={100}
                  />
                </Link>
                <p className="absolute bottom-7 left-1/2 transform -translate-x-1/2 pb-2 text-white font-bold text-md md:text-xl px-2 rounded whitespace-nowrap flex items-center">
                  {profile.nome}
                  {profile.certificado && (
                    <VscVerifiedFilled className="text-green-400 ml-2" />
                  )}
                </p>
                <p className="absolute bottom-0 left-0 right-0 text-white text-center py-2">
                  {profile.cidade} <FaMapMarkerAlt className="text-rose-800 inline-block" />
                </p>
              </div>
            </div>
          ))}
        </Slider>
        <button
          onClick={() => this.handleClick("prev")}
          className="bg-gray-700 bg-opacity-50 hover:bg-rose-800 text-white font-semibold hover:text-white py-2 px-4 rounded-full absolute top-1/2 transform -translate-y-1/2 left-4"
        >
          &lt;
        </button>
        <button
          onClick={() => this.handleClick("next")}
          className="bg-gray-700 bg-opacity-50 hover:bg-rose-800 text-white font-semibold hover:text-white py-2 px-4 rounded-full absolute top-1/2 transform -translate-y-1/2 right-4"
        >
          &gt;
        </button>
      </div>
    );
  }
}

export default CarouselG;
