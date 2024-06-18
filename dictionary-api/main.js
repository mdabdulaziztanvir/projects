async function dictionaryAPI() {
  const dictionaryInput = document
    .getElementById("dictionary-input")
    .value.toLowerCase();
  const showName = document.getElementById("showName");
  const showPhoneTicName = document.getElementById("showPhoneTicName");
  const showPartOfSpeechDiv = document.getElementById("showPartOfSpeechDiv");
  const showDetailsDefinition = document.getElementById(
    "showDetailsDefinition"
  );
  const showAntonym = document.getElementById("showAntonym");
  const showSynonym = document.getElementById("showSynonym");
  const showPhoneticsName = document.getElementById("showPhoneticsName");
  const showPhoneticsAudio = document.getElementById("showPhoneticsAudio");

  try {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${dictionaryInput}`
    );
    if (!response.ok) {
      throw new Error("this is from theough error");
    }

    const datas = await response.json();
    for (let data of datas) {
      // console.log(data);
      const name = data.word;
      showName.innerHTML = `<li>${name}</li>`;

      // phonetic name
      const phoneTicName = data.phonetic;
      showPhoneTicName.innerHTML = `phonetic ${phoneTicName}`;

      console.log(`1${name}`);
      console.log(phoneTicName);

      //   array of meaning
      const meanings = data.meanings;
      meanings.map((meaning) => {
        // console.log(meaning);

        // parts Of Speeech
        const partOfSpeech = meaning.partOfSpeech;

        const appendedDiv = document.createElement("div");
        appendedDiv.className = "aaaa";
        const appendedPartsOfSpeech = document.createElement("h2");

        appendedPartsOfSpeech.textContent = partOfSpeech.toUpperCase();

        appendedDiv.appendChild(appendedPartsOfSpeech);
        showPartOfSpeechDiv.appendChild(appendedDiv);
        console.log(partOfSpeech);

        // defination
        const definitions = meaning.definitions;

        // antonym
        const antonyms = meaning.antonyms;

        // synonyms
        const synonyms = meaning.synonyms;

        // check the defination
        if (definitions && definitions.length > 0) {
          for (let definition in definitions) {
            const detailsDefinition = definitions[definition].definition;
            const appendedDefination = document.createElement("p");
            appendedDefination.className = "aaa";
            appendedDefination.textContent = detailsDefinition;
            appendedDiv.appendChild(appendedDefination);
            console.log(detailsDefinition);
          }
        } else {
          console.log(`no defination for this word${dictionaryInput}`);
        }
        // chech the antonym
        if (!antonyms.length == []) {
          const antonymHeading = document.createElement("h3");
          antonymHeading.className = "antonym-class";
          antonymHeading.textContent = "Antonyms:";
          appendedDiv.appendChild(antonymHeading);
          const newDiv = document.createElement("div");
          newDiv.className = "newDiv";
          for (let antonym of antonyms) {
            const appendedAntonym = document.createElement("p");
            appendedAntonym.innerHTML = `<code> ${antonym}</code>`;
            newDiv.appendChild(appendedAntonym);
            appendedDiv.appendChild(newDiv);
            console.log(antonym);
          }
        } else {
          console.log("No antonym found");
        }
        // chech the synonym
        if (!synonyms.length == []) {
          const synonymHeading = document.createElement("h3");
          synonymHeading.className = "synonym-class";
          synonymHeading.textContent = "Synonyms:";
          appendedDiv.appendChild(synonymHeading);
          const newDivTwo = document.createElement("div");
          newDivTwo.className = "newDivTwo";
          for (let synonym of synonyms) {
            const synOrderList = document.createElement("ol");

            const appendedSynonym = document.createElement("p");

            appendedSynonym.innerHTML = `<code>${synonym}</code>`;
            newDivTwo.appendChild(appendedSynonym);
            appendedDiv.appendChild(newDivTwo);
            console.log(`synonym:${synonym}`);
          }
        } else {
          console.log("No synonym found");
        }

        // append child with parts of speech
      });

      //   phonetics array
      const phonetics = data.phonetics;
      for (let phonetic of phonetics) {
        // console.log(phonetic.audio);
        const phoneticsName = phonetic.text;
        const phoneticsAudio = phonetic.audio;

        console.log(phoneticsName);
        console.log(phoneticsAudio);
      }
    }
  } catch (err) {
    console.error(err);
  }
}
