<template>
  <p class="body">
    This application allows the user to search for any movie in the OMDB API database (http://www.omdbapi.com/) and learn basic facts about the movie. Search results can be added to a list that is stored in the user's local cache for easy access.
    <br />A Vue JS project by John Hu
    <a href="http://www.github.com/johnhu">
      <img
        src="../assets/img/github-white.svg"
        title="Visit John's Github"
        width="16px"
        height="16px"
      />
    </a>
  </p>
</template>

<script>
export default {
  name: "About",
  data() {
    return {
      showAbout: true
    };
  }
};
</script>

<style scoped>
.body {
  background-color: rgb(43, 45, 47, 0.5);
}
img:hover {
  opacity: 0.5;
}
</style>