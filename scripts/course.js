const courses = [
    { name: "CSE110", type: "CSE", completed: true },
    { name: "WDD130", type: "WDD", completed: false },
    { name: "CSE111", type: "CSE", completed: true },
    { name: "CSE210", type: "CSE", completed: false },
    { name: "WDD131", type: "WDD", completed: true },
    { name: "WDD231", type: "WDD", completed: false }
];

function displayCourses(filter) {
    const container = document.getElementById("coursesContainer");
    container.innerHTML = "";

    const filteredCourses = filter ? courses.filter(course => course.type === filter) : courses;

    filteredCourses.forEach(course => {
        const div = document.createElement("div");
        div.textContent = course.name;
        div.style.background = course.completed ? "brown" : "grey"; // Brown if completed
        div.style.color = "white"; // Ensures text color is white
        div.style.padding = "10px"; // Adds padding for better readability
        div.style.margin = "5px 0"; // Adds spacing between items
        div.style.borderRadius = "5px"; // Rounds corners slightly
        container.appendChild(div);
    });
}

document.getElementById("allCourses").addEventListener("click", () => displayCourses());
document.getElementById("wddCourses").addEventListener("click", () => displayCourses("WDD"));
document.getElementById("cseCourses").addEventListener("click", () => displayCourses("CSE"));

displayCourses();