<template lang="pug">
.time(data-header)
  .time__content
    div.time__content-title1(style="margin-right:auto")
      div {{ time }}
      div {{ welcomeMsg }} Mr Oday Alkouz
      div {{ Fulldate }}{{ `, ${new Date().getFullYear()}` }}
</template>

<script>

export default {

  name: "Time",

  data() {
    return {
      time: "00:00",
      months: this.$store.state.months,
      days: this.$store.state.days
    };
  },
  computed: {
    Fulldate() {
      const day = new Date()
      return this.monthAndDay = this.days[day.getDay()] + ", " + day.getDate()+" " + this.months[day.getMonth()] 
    },
    welcomeMsg() {
      const time = new Date().getHours();
      if (time > 3 && time < 12) {
        return "Good Morning";
      } else if (time >= 12 && time < 18) {
        return "Good Afternoon";
      } else {
        return "Good Night";
      }
    }
  },
  beforeCreate() {
    setInterval(() => {
      const d = new Date();
      const hour = d.getHours();
      const minutes = d.getMinutes();
      const format = hour >= 12 ? "PM" : "AM";
      this.time = `${hour > 12 ? hour - 12 : hour}:${
        minutes < 10 ? "0" + minutes : minutes
      } ${format}`;
    }, 1000);
  },
};
</script>

<style scoped lang="scss">
@import "./time.scss";
</style>
