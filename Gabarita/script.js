
const defaultConfig = {
  app_title: "GABARITA",
  welcome_message: "Bem-vindo ao Gabarita",
  home_title: "Aprenda de forma inteligente",
  home_subtitle: "Sua jornada de estudos começa aqui",
  start_button: "Começar Agora",
  background_color: "#FFB3D9",
  surface_color: "#FFFFFF",
  text_color: "#333333",
  primary_action_color: "#D81B60",
  secondary_action_color: "#8E24AA",
  font_family: "Poppins",
  font_size: 16
};

async function onConfigChange(config) {
  const fontFamily = config.font_family || defaultConfig.font_family;
  const baseFontSize = config.font_size || defaultConfig.font_size;
  const backgroundColor = config.background_color || defaultConfig.background_color;
  const textColor = config.text_color || defaultConfig.text_color;
  const primaryColor = config.primary_action_color || defaultConfig.primary_action_color;
  const secondaryColor = config.secondary_action_color || defaultConfig.secondary_action_color;

  document.body.style.fontFamily = `${fontFamily}, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`;
  
  document.querySelector('.content').style.background = `linear-gradient(180deg, ${backgroundColor} 0%, ${backgroundColor} 100%)`;
  
  document.querySelector('.home-subtitle').style.color = textColor;
  document.querySelector('.home-subtitle').style.fontSize = `${baseFontSize * 1.5}px`;
  
  document.querySelector('.header').style.background = `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`;
  document.querySelector('.welcome-badge').style.background = `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`;
  document.querySelector('.cta-button').style.background = `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`;
  document.querySelector('.footer').style.background = `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`;

  document.getElementById('appTitle').textContent = config.app_title || defaultConfig.app_title;
  document.getElementById('welcomeMessage').textContent = config.welcome_message || defaultConfig.welcome_message;
  document.getElementById('homeTitle').textContent = config.home_title || defaultConfig.home_title;
  document.getElementById('homeSubtitle').textContent = config.home_subtitle || defaultConfig.home_subtitle;
  document.getElementById('startButton').textContent = config.start_button || defaultConfig.start_button;
}

function mapToCapabilities(config) {
  return {
    recolorables: [
      {
        get: () => config.background_color || defaultConfig.background_color,
        set: (value) => {
          if (window.elementSdk) {
            window.elementSdk.config.background_color = value;
            window.elementSdk.setConfig({ background_color: value });
          }
        }
      },
      {
        get: () => config.text_color || defaultConfig.text_color,
        set: (value) => {
          if (window.elementSdk) {
            window.elementSdk.config.text_color = value;
            window.elementSdk.setConfig({ text_color: value });
          }
        }
      },
      {
        get: () => config.primary_action_color || defaultConfig.primary_action_color,
        set: (value) => {
          if (window.elementSdk) {
            window.elementSdk.config.primary_action_color = value;
            window.elementSdk.setConfig({ primary_action_color: value });
          }
        }
      },
      {
        get: () => config.secondary_action_color || defaultConfig.secondary_action_color,
        set: (value) => {
          if (window.elementSdk) {
            window.elementSdk.config.secondary_action_color = value;
            window.elementSdk.setConfig({ secondary_action_color: value });
          }
        }
      }
    ],
    borderables: [],
    fontEditable: {
      get: () => config.font_family || defaultConfig.font_family,
      set: (value) => {
        if (window.elementSdk) {
          window.elementSdk.config.font_family = value;
          window.elementSdk.setConfig({ font_family: value });
        }
      }
    },
    fontSizeable: {
      get: () => config.font_size || defaultConfig.font_size,
      set: (value) => {
        if (window.elementSdk) {
          window.elementSdk.config.font_size = value;
          window.elementSdk.setConfig({ font_size: value });
        }
      }
    }
  };
}

function mapToEditPanelValues(config) {
  return new Map([
    ["app_title", config.app_title || defaultConfig.app_title],
    ["welcome_message", config.welcome_message || defaultConfig.welcome_message],
    ["home_title", config.home_title || defaultConfig.home_title],
    ["home_subtitle", config.home_subtitle || defaultConfig.home_subtitle],
    ["start_button", config.start_button || defaultConfig.start_button]
  ]);
}

if (window.elementSdk) {
  window.elementSdk.init({
    defaultConfig,
    onConfigChange,
    mapToCapabilities,
    mapToEditPanelValues
  });
}