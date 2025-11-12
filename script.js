// load lesson category

const lessonCategory = () => {
  //   const url = ``;

  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((data) => showLessonCategory(data.data));
};

// load lesson

function loadLesson(level) {
  url = `https://openapi.programming-hero.com/api/level/${level}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => displayLesson(data.data));
}

// load word description

function loadDescription(id) {
  console.log(id);
  url = `https://openapi.programming-hero.com/api/word/${id}
`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayDescription(data.data));
  document.getElementById("wordDesc").showModal();
}
// show lesoon category on page

function showLessonCategory(categoryData) {
  console.log(categoryData);

  const lessonContainer = document.getElementById("lesson-category-container");

  for (const category of categoryData) {
    console.log(category);
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML = `
    <button
            id="btn-all"
            onclick="loadLesson(${category.level_no})"
            class="btn !p-5 !text-xs bg-primary text-white border-primary border hover:bg-secondary hover:border-secondary"
          >
            <i class="fa-solid fa-book"></i> Lesson-${category.level_no}
          </button>
    `;

    lessonContainer.append(categoryDiv);
  }
}
// text to speech

function speakWord(word) {
  if (!word) {
    alert("No word available to pronounce!");
    return;
  }

  const utterance = new SpeechSynthesisUtterance(word); // Create a speech request
  utterance.lang = "en-US"; // Set language/accent
  utterance.rate = 1; // Speed (1 is normal)
  utterance.pitch = 2; // Pitch (1 is normal)

  window.speechSynthesis.speak(utterance); // Speak the word
}

// display lesson

function displayLesson(lessons) {
  const lessonContainer = document.getElementById("displayLesson");
  lessonContainer.innerHTML = "";

  if (lessons.length > 0) {
    for (const lesson of lessons) {
      const lessonWrapper = document.createElement("div");
      console.log(lesson);

      lessonWrapper.innerHTML = `
    
    <div class="card card-dash bg-base-100 w-[300px]">
            <div class="card-body">
              <h2 class="!text-lg font-bold !text-center">${lesson.word}</h2>
              <h3 class="text-center !text-sm">Meaning/Pronunciation</h3>
              <h2 class="!text-md font-extrabold text-center">${
                lesson.meaning ? lesson.meaning : "No meaning found"
              }/${lesson.pronunciation}</h2>
              <div class="card-actions justify-between mt-10">
                <button onclick="loadDescription(${lesson.id})"
                  class="!bg-btnbg/50 p-2 btn hover:text-primary hover:shadow-none shadow-none"
                >
                  <i class="fa-solid fa-circle-info" ></i>
                </button>
                <button
                onclick="speakWord('${lesson.word}')"
                  class="btn !bg-btnbg/50  p-2 hover:text-primary hover:shadow-none shadow-none"
                >
                  <i class="fa-solid fa-volume-high"></i>
                </button>
              </div>
            </div>
          </div>
    
    `;

      lessonContainer.append(lessonWrapper);
    }
  } else {
    const noLessonFound = document.createElement("div");
    noLessonFound.classList.add(
      "col-span-full",
      "flex",
      "flex-col",
      "justify-center",
      "items-center"
    );
    noLessonFound.innerHTML = `
      <img src="https://img.icons8.com/?size=96&id=mpWDxLzGBRwX&format=png">
        <h2 class="text-xl font-semibold text-gray-600">
          No lessons found for this category 😔
        </h2>
        <p class="text-sm text-gray-500 mt-2">
          Please try another lesson level.
        </p>
      </div>
      `;
    lessonContainer.append(noLessonFound);
  }

  // console.log(lessonContainer);
}

// display description

function displayDescription(data) {
  console.log(data);
  const synonyms = data.synonyms;

  const btnElement = synonyms
    .map(
      (item, index) =>
        `
    <button class="btn !px-4 border shadow-none border-primary">${item}</button>
    `
    )
    .join("");

  const modal = document.getElementById("wordDesc");
  const modalContent = document.getElementById("wordDescContent");

  modalContent.innerHTML = `

<div class="card w-96 bg-base-100 card-sm shadow-none">
  <div class="card-body ">
    <h2 class="!text-lg !mb-3 font-bold ">${
      data.word
    } (<i class="fa-solid fa-microphone-lines"></i> ${data.pronunciation} )</h2>
    <h3 class="font-bold !mb-0 !pb-0">Meaning</h3>
    <p class="!-mt-2 ">${
      data.meaning ? (data.meaning = null) : "no meaning found"
    }</p>
    <h3 class="font-bold !mb-0 !pb-0">Example</h3>
    <p class="!-mt-2 !mb-4">${data.sentence}</p>
    <h3 class="font-bold !mb-0 !pb-0">Synonyms</h3>
    
    <div class="justify-start card-actions ">

    ${btnElement}

    </div>
  </div>
</div>

  `;
}

const lessonContainer = document.getElementById("displayLesson");
lessonContainer.innerHTML = `
  <div class="text-center p-10  col-span-full">
    <h2 class="text-xl font-semibold text-gray-600  ">
      No lesson selected yet 😔
    </h2>
    <p class="text-sm text-gray-500 mt-2">
      Please select a lesson to start learning!
    </p>
  </div>
`;

lessonCategory();
