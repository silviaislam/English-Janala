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

  // console.log(url);
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

// display lesson

function displayLesson(lessons) {
  const lessonContainer = document.getElementById("displayLesson");

  for (const lesson of lessons) {
    const lessonWrapper = document.createElement("div");
    console.log(lesson);

    lessonWrapper.innerHTML = `
    
    <div class="card card-dash bg-base-100 w-[300px]">
            <div class="card-body">
              <h2 class="!text-lg font-bold !text-center">${lesson.word}</h2>
              <h3 class="text-center !text-sm">sub heading</h3>
              <h2 class="!text-2xl font-extrabold text-center">meaning</h2>
              <div class="card-actions justify-between mt-10">
                <button
                  class="!bg-btnbg/50 p-2 btn hover:text-primary hover:shadow-none shadow-none"
                >
                  <i class="fa-solid fa-circle-info"></i>
                </button>
                <button
                  class="btn !bg-btnbg/50 p-2 hover:text-primary hover:shadow-none shadow-none"
                >
                  <i class="fa-solid fa-volume-high"></i>
                </button>
              </div>
            </div>
          </div>
    
    `;

    lessonContainer.append(lessonWrapper);
  }

  // console.log(lessonContainer);
}

lessonCategory();
