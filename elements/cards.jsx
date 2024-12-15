"use client";

import { Check, X, MapPin, Users, RotateCcw } from "lucide-react";
import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import Image from "next/image";
import sportData from "../public/data/sportData.json";

const UNSPLASH_ACCESS_KEY = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;
const GIPHY_API_KEY = process.env.NEXT_PUBLIC_GIPHY_API_KEY;

//requete API Unsplash
const getUnsplashImage = async (keyword) => {
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${keyword}&client_id=${UNSPLASH_ACCESS_KEY}&per_page=1`
    );
    const data = await response.json();
    return data.results[0]?.urls?.regular;
  } catch (error) {
    console.error("Erreur lors de la récupération de l'image:", error);
    return null;
  }
};

//requete API Giphy
const getGiphyGif = async (keyword) => {
  try {
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${keyword}&limit=1&rating=g`
    );
    const data = await response.json();
    return data.data[0]?.images?.original?.url;
  } catch (error) {
    console.error("Erreur lors de la récupération du GIF:", error);
    return null;
  }
};

// POPUP RESULTAT
const ResultPopup = ({ sport, onReset }) => {
  const [sportImage, setSportImage] = useState(null);

  useEffect(() => {
    const loadSportImage = async () => {
      const image = await getUnsplashImage(sport.name);
      setSportImage(image);
    };
    loadSportImage();
  }, [sport]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="absolute inset-0 z-50 bg-black/50 flex items-center justify-center p-4 text-black">
      <div className="w-full max-w-3xl bg-white rounded-[2rem] overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="p-8 flex-1">
            <h2 className="text-4xl font-black mb-6">{sport.name}</h2>
            <p className="text-gray-700 mb-8">{sport.description}</p>
            <div className="flex gap-4">
              <button className="flex items-center gap-2 border-2 border-black rounded-full px-6 py-2 hover:bg-gray-100">
                <MapPin className="w-5 h-5" />
                Location near me
              </button>
              <button className="flex items-center gap-2 border-2 border-black rounded-full px-6 py-2 hover:bg-gray-100">
                <Users className="w-5 h-5" />
                Invite a friend
              </button>
            </div>
            <button
              onClick={onReset}
              className="mt-8 flex items-center gap-2 text-sm text-gray-500 hover:text-black"
            >
              <RotateCcw className="w-4 h-4" />
              Take the quiz again
            </button>
          </div>

          <div className="w-full md:w-[300px] h-[200px] md:h-auto bg-gray-100">
            {sportImage && sportImage !== "" && (
              <Image
                src={sportImage}
                alt={sport.name}
                className="w-full h-full object-cover"
                width={300}
                height={400}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

//SWIPPER
export default function SportSwipe() {
  const { sports, questions, cardColors } = sportData;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [matchedSport, setMatchedSport] = useState(null);
  const [allGifs, setAllGifs] = useState(Array(10).fill(null));

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-30, 30]);

  const findBestMatch = () => {
    let bestMatch = null;
    let highestScore = -1;

    // Calcul du score pour chaque sport
    sports.forEach((sport) => {
      let score = 0;
      if ((answers[0] === 1) === sport.criteria.team) score++;
      if ((answers[1] === 1) === sport.criteria.contact) score++;
      if ((answers[2] === 1) === sport.criteria.intensity) score++;
      if ((answers[3] === 1) === sport.criteria.outdoor) score++;
      if ((answers[4] === 1) === sport.criteria.strategy) score++;

      if (score > highestScore) {
        highestScore = score;
        bestMatch = sport;
      }
    });

    return bestMatch;
  };

  // Logique animation des cartes
  const animateCard = async (direction) => {
    await animate(x, direction * 400, { duration: 0.7 });

    setAnswers((prevAnswers) => [...prevAnswers, direction > 0 ? 1 : 0]);

    x.set(0);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      const match = findBestMatch();
      setMatchedSport(match);
      setShowResult(true);
    }
  };

  const handleButtonClick = (isRight) => {
    animateCard(isRight ? 1 : -1);
  };

  const handleDragEnd = (event, info) => {
    if (info.offset.x > 100) {
      handleButtonClick(true);
    } else if (info.offset.x < -100) {
      handleButtonClick(false);
    }
  };

  //Reset du quiz
  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
    setMatchedSport(null);
  };

  //Chargement des gifs au chargement de la page
  useEffect(() => {
    const loadAllGifs = async () => {
      const gifPromises = questions.map((q) => getGiphyGif(q.gifKeyword));
      const gifs = await Promise.all(gifPromises);
      setAllGifs(gifs);
    };
    loadAllGifs();
  }, []);

  return (
    <div id="quizz">

      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 relative">
        <div className="absolute w-[80vh] h-[80vh] rounded-[1000px] bg-[url('/default.png')] bg-cover"></div>
        <div className="w-[350px] h-[700px] border-8 border-zinc-800 rounded-[3rem] p-4 relative bg-white">
          <div className="absolute top-0 bg-zinc-800 left-1/2 -translate-x-1/2 w-40 h-4 rounded-b-3xl"></div>

          <div className="w-full h-full bg-cover rounded-[2.5rem] overflow-hidden relative">
            <div className="h-full pt-10">
              <div className="mb-12 text-center">
                <span className="text-xl font-bold px-4 py-2 mt-5 bg-zinc-700 text-white rounded-[100px] font-[family-name:var(--font-satoshi)]">
                  {currentQuestion + 1} / {questions.length}
                </span>
              </div>

              <div className="flex flex-col items-center justify-between h-[calc(100%-3rem)]">
                <motion.div
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  style={{ x, rotate }}
                  onDragEnd={handleDragEnd}
                  className={`touch-none w-4/5 ${cardColors[currentQuestion % cardColors.length]
                    } border-4 rounded-xl border-black cursor-grab active:cursor-grabbing bg-white text-black p-4`}
                >
                  <div className="w-full aspect-square overflow-hidden relative">
                    {allGifs.map(
                      (gif, index) =>
                        gif && (
                          <div key={index} className="absolute inset-0">
                            {" "}
                            <Image
                              src={gif}
                              alt={`Question ${index + 1}`}
                              className={`w-full rounded-xl h-full object-cover pointer-events-none transition-opacity duration-300 ${index === currentQuestion
                                ? "opacity-100"
                                : "opacity-0"
                                }`}
                              fill
                              sizes="100%"
                              unoptimized={true}
                            />
                          </div>
                        )
                    )}
                  </div>

                  <div className="py-4">
                    <h2 className="text-xl font-bold font-[family-name:var(--font-satoshi)]">
                      {questions[currentQuestion]?.question}
                    </h2>
                  </div>
                </motion.div>

                <div className="flex bg-zinc-700 w-full rounded-[100px] py-2 justify-evenly mb-10">
                  <button
                    onClick={() => handleButtonClick(false)}
                    className="w-[45%] h-12 bg-red-400 rounded-full flex items-center justify-center hover:bg-red-300"
                  >
                    <X className="w-8 h-8" />
                  </button>
                  <button
                    onClick={() => handleButtonClick(true)}
                    className="w-[45%] h-12 bg-green-400 rounded-full flex items-center justify-center hover:bg-green-300"
                  >
                    <Check className="w-8 h-8" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {showResult && matchedSport && (
          <ResultPopup sport={matchedSport} onReset={resetQuiz} />
        )}
      </div>
    </div>
  );
}
