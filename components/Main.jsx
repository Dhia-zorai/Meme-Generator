import { useState, useEffect } from "react";

export default function Main() {
  const [meme, setMeme] = useState({
    topText: "Top Text",
    bottomText: "Bottom Text",
    imageUrl: "http://i.imgflip.com/1bij.jpg",
  });

  const [allMemes, setAllMemes] = useState([]);

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((result) => result.json())
      .then((data) => setAllMemes(data.data.memes));
  });


  function handleChange(event) {
    const { value, name } = event.currentTarget;

    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  }

  function getNewImage() {
    const img = allMemes[Math.floor(Math.random() * allMemes.length)];
    console.log(img);

    setMeme((prevMeme) => ({
      ...prevMeme,
      imageUrl: img.url,
    }));
  }

  return (
    <main>
      <div className="form">
        <label>
          Top Text
          <input
            type="text"
            placeholder="One does not simply"
            name="topText"
            onChange={handleChange}
          />
        </label>

        <label>
          Bottom Text
          <input
            type="text"
            placeholder="Walk into Mordor"
            name="bottomText"
            onChange={handleChange}
          />
        </label>
        <button onClick={getNewImage}>Get a new meme image 🖼</button>
      </div>
      <div className="meme">
        <img src={meme.imageUrl} />
        <span className="top">{meme.topText}</span>
        <span className="bottom">{meme.bottomText}</span>
      </div>
    </main>
  );
}
