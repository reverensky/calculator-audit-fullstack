const { collectEvent } = require("../repositories/analytics.repository");

async function getAnalyticsEvents() {}

async function collectAnalyticsEvent() {
  try {
    // await collectEvent({
    //   userId: "anon-" + Date.now(),
    //   sessionId: "anon-" + Date.now(),
    //   eventType: "view",
    //   eventData: {},
    //   pageUrl: "", // Set appropriately or pass as a parameter
    //   userAgent: "", // Set appropriately or pass as a parameter
    //   ipAddress: "0.0.1",
    // });
    return {
      customCode: 204,
      data: {
        message: "Analytics event collected successfully",
      },
    };
  } catch (error) {
    console.error("Error collecting analytics event:", error);
  }
}

module.exports = {
  getAnalyticsEvents,
  collectAnalyticsEvent,
};
