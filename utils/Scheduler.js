const schedule = require("node-schedule");
const Admin = require("../models/Admin.js");
const Delivery = require("../models/Delivery.js");

function updateIncentive(deliveryData, date, id) {
  deliveryData.forEach((ele, index) => {
    const answer = schedule.scheduleJob(date, async function () {
      const admin = await Admin.findById(id);
      console.log(admin, "admin", index);
      const delivery = await Delivery.findById(ele.toString());
      console.log(ele.toString(), index);
      console.log(delivery, index);
      let amount = 0;
      console.log(delivery.todayOrders);

      if (delivery.todayOrders > 9) {
        amount = admin.incentiveTen1;
      }
      if (delivery.todayOrders > 19) {
        amount = admin.incentiveTen2;
      }
      if (delivery.todayOrders > 29) {
        amount = admin.incentiveTen3;
      }
      if (delivery.todayOrders > 39) {
        amount = admin.incentiveTen4;
      }
      if (delivery.todayOrders > 49) {
        amount = admin.incentiveTen5;
      }
      console.log(amount, "10000", index);
      const incentive = {
        amount: amount,
        date: date,
        thisMonth: true,
      };
      delivery.incentives = [...delivery.incentives, incentive];
      // delivery.todayOrders = 0;
      await delivery.save();
    });
  });
  // console.log("Active service workers so far: ", schedule.scheduledJobs);
}

function updateMonth(deliveryData) {
  deliveryData.forEach((ele, index) => {
    const dt = new Date(Date.now());
    const date = new Date(dt.getTime() + 60000);
    schedule.scheduleJob(date, async function () {
      const delivery = await Delivery.findById(ele.toString());
      let amount = 0;
      delivery.incentives.forEach((ele) => {
        if (ele.thisMonth) {
          amount += ele.amount;
        }
      });
      let result = delivery.incentives.filter((ele) => (ele.thisMonth = false));
      const newMonth = {
        amount: amount,
        date: date,
        thisMonth: false,
      };
      result = [...result, newMonth];
      delivery.incentives = result;
      delivery.save();
    });
  });
}

module.exports = { updateMonth, updateIncentive };
