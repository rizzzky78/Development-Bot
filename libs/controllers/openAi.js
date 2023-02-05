const { apikeys } = require("../../config/global.config");

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: apikeys.openAi,
});
const openai = new OpenAIApi(configuration);

/**
 * @param { string } queryPrompt
 * @example
 * ReturnValue: AxiosResponse.data.choices[0].text // result
 * Status: AxiosResponse.status = 200 | 400 | etc // status response
 */
const Davinci = async (queryPrompt) => {
  return await openai.createCompletion({
    model: "text-davinci-003",
    prompt: queryPrompt,
    max_tokens: 4096, // range 0~2048 & 0~4096
    temperature: 0,
    presence_penalty: 1.5, // range: -2.0 ~ 2.0
    frequency_penalty: 1.7, // range: -2.0 ~ 2.0
  });
};
/**
 * @param { string } queryPrompt
 * @example
 * ReturnValue: AxiosResponse.data.choices[0].text // result
 * Status: AxiosResponse.status = 200 | 400 | etc // status response
 */
const Curie = async (queryPrompt) => {
  return await openai.createCompletion({
    model: "text-curie-001",
    prompt: queryPrompt,
    max_tokens: 2048, // range 0~2048 & 0~4096
    temperature: 0.2,
    presence_penalty: 1, // range: -2.0 ~ 2.0
    frequency_penalty: 1.2, // range: -2.0 ~ 2.0
  });
};
/**
 * @param { string } queryPrompt
 * @example
 * ReturnValue: AxiosResponse.data.choices[0].text // result
 * Status: AxiosResponse.status = 200 | 400 | etc // status response
 */
const Codex = async (queryPrompt) => {
  return await openai.createCompletion({
    model: "code-davinci-002",
    prompt: queryPrompt,
    max_tokens: 8000, // range 0~2048 & 0~4096 codex: 8000
    temperature: 0,
    presence_penalty: 0.5, // range: -2.0 ~ 2.0
    frequency_penalty: 1.5, // range: -2.0 ~ 2.0
  });
};
/**
 * @param { string } queryPrompt
 * @example
 * ReturnValue: AxiosResponse.data.choices[0].url // URL image result
 * Status: AxiosResponse.status = 200 | 400 | etc // status response
 */
const Dalle = async (queryPrompt) => {
  return await openai.createImage({
    prompt: queryPrompt,
    n: 1,
    size: "256x256",
  });
};

const OpenAi = { Davinci, Curie, Codex, Dalle };

module.exports = { OpenAi };
