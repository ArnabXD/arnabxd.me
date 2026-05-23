import { createElement as h } from "react";

export type OgData = {
  title: string;
  description?: string;
  tags?: string[];
  date?: string;
  type?: "page" | "post";
};

export function truncateWords(text: string, maxLen: number): string {
  if (text.length <= maxLen) return text;
  return text.slice(0, text.lastIndexOf(" ", maxLen)) + "...";
}

export function buildOgElement(data: OgData) {
  const { title, description, tags = [], date, type = "page" } = data;

  const fontSize = title.length > 60 ? "54px" : title.length > 40 ? "64px" : "76px";

  return h(
    "div",
    {
      style: {
        width: "1200px",
        height: "630px",
        background: "#15140f",
        display: "flex",
        flexDirection: "column",
        fontFamily: "'Space Grotesk'",
        position: "relative",
        overflow: "hidden",
      },
    },
    // Background grid
    h("div", {
      style: {
        position: "absolute",
        inset: "0px",
        backgroundImage:
          "linear-gradient(rgba(243,237,226,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(243,237,226,0.03) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      },
    }),
    // Right glow
    h("div", {
      style: {
        position: "absolute",
        right: "-80px",
        top: "-80px",
        width: "500px",
        height: "500px",
        background: "radial-gradient(circle, rgba(255,59,24,0.12) 0%, transparent 70%)",
        borderRadius: "50%",
      },
    }),
    // Left bottom glow
    h("div", {
      style: {
        position: "absolute",
        left: "-60px",
        bottom: "-60px",
        width: "360px",
        height: "360px",
        background: "radial-gradient(circle, rgba(255,59,24,0.07) 0%, transparent 70%)",
        borderRadius: "50%",
      },
    }),
    // Top accent bar
    h("div", {
      style: {
        position: "absolute",
        top: "0px",
        left: "0px",
        right: "0px",
        height: "3px",
        background:
          "linear-gradient(90deg, #ff3b18 0%, rgba(255,59,24,0.3) 40%, transparent 70%)",
      },
    }),
    // Main layout
    h(
      "div",
      {
        style: {
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px 72px 52px",
          height: "100%",
          position: "relative",
        },
      },
      // Top label
      h(
        "div",
        { style: { display: "flex", alignItems: "center", gap: "12px" } },
        h("div", {
          style: {
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: "#ff3b18",
          },
        }),
        h(
          "div",
          {
            style: {
              color: "#ff3b18",
              fontSize: "13px",
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            },
          },
          type === "post" ? "Journal - arnabxd.me" : "arnabxd.me"
        )
      ),
      // Center: tags + title + description
      h(
        "div",
        { style: { display: "flex", flexDirection: "column", gap: "20px" } },
        type === "post" && tags.length > 0
          ? h(
              "div",
              { style: { display: "flex", gap: "8px", flexWrap: "wrap" } },
              ...tags.slice(0, 4).map((tag) =>
                h(
                  "div",
                  {
                    key: tag,
                    style: {
                      color: "#9b9485",
                      fontSize: "12px",
                      fontWeight: 500,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      border: "1px solid rgba(155,148,133,0.25)",
                      padding: "4px 10px",
                      borderRadius: "4px",
                    },
                  },
                  tag
                )
              )
            )
          : null,
        h(
          "div",
          {
            style: {
              color: "#f3ede2",
              fontSize,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              maxWidth: "900px",
            },
          },
          title
        ),
        description
          ? h(
              "div",
              {
                style: {
                  color: "#6b6456",
                  fontSize: "20px",
                  lineHeight: 1.5,
                  letterSpacing: "-0.01em",
                  maxWidth: "780px",
                },
              },
              truncateWords(description, 130)
            )
          : null
      ),
      // Footer
      h(
        "div",
        {
          style: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(243,237,226,0.08)",
            paddingTop: "24px",
          },
        },
        h(
          "div",
          { style: { display: "flex", alignItems: "center", gap: "14px" } },
          h(
            "div",
            {
              style: {
                width: "40px",
                height: "40px",
                background: "#f3ede2",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "22px",
                fontWeight: 700,
                color: "#15140f",
                letterSpacing: "-0.04em",
              },
            },
            "A"
          ),
          h(
            "div",
            {
              style: { display: "flex", flexDirection: "column", gap: "2px" },
            },
            h(
              "div",
              {
                style: {
                  color: "#f3ede2",
                  fontSize: "17px",
                  fontWeight: 600,
                  letterSpacing: "-0.02em",
                },
              },
              "Arnab Paryali"
            ),
            h(
              "div",
              {
                style: {
                  color: "#6b6456",
                  fontSize: "12px",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                },
              },
              "Software Engineer"
            )
          )
        ),
        date
          ? h(
              "div",
              {
                style: {
                  color: "#6b6456",
                  fontSize: "13px",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  background: "rgba(243,237,226,0.05)",
                  padding: "8px 16px",
                  borderRadius: "6px",
                  border: "1px solid rgba(243,237,226,0.08)",
                },
              },
              date
            )
          : null
      )
    )
  );
}
