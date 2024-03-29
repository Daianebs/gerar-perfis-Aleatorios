const API_AVATAR_URL = "https://avatars.dicebear.com/api/adventurer/";
const API_RANDOMUSER_URL = "https://randomuser.me/api/";

const elements = {
  avatarImage: document.querySelector("#avatar-image"),
  name: document.querySelector("#name"),
  email: document.querySelector("#email"),
  newProfileButton: document.querySelector("#new-profile-button"),
  body: document.querySelector("body"),
  address: document.querySelector("#address"),
};

function getRandomSeed() {
  return Math.random().toString(36).substring(7);
}

function buildAvatarUrl(seed) {
  return `${API_AVATAR_URL}${seed}.svg`;
}

async function getRandomUser() {
  try {
    const response = await fetch(API_RANDOMUSER_URL);
    const { results } = await response.json();
    return results[0];
  } catch (error) {
    console.error("Erro ao obter dados do usuário:", error);
    throw error;
  }
}

function updateUserInterface(user) {
  const { name, email, location } = user;
  elements.name.textContent = `${name.first} ${name.last}`
  elements.email.textContent = email;
  elements.avatarImage.src = buildAvatarUrl(getRandomSeed());
  elements.address.textContent =
  `${location.street.name}, ${location.street.number}, ${location.city}`
  changeBackgroundColor();
}

async function updateProfile() {
  try {
    const user = await getRandomUser();
    updateUserInterface(user);
  } catch (error) {
    console.error("Erro ao atualizar perfil:", error);
  }
}

function changeBackgroundColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  elements.avatarImage.style.backgroundColor = color;
}

elements.newProfileButton.addEventListener("click", updateProfile);
updateProfile();
