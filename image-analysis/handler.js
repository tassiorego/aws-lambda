'use strict';
const { promises: { readFile } } = require('fs');
class Handler {
  constructor({ rekoSvc, translateSvc }) {
    this.rekoSvc = rekoSvc;
    this.translateSvc = translateSvc;
  }
  async detectImageLabels(buffer) {
    const result = await this.rekoSvc.detectLabels({
      Image: {
        Bytes: buffer,
      }
    }).promise();
    const workingItems = result.Labels.filter(({ Confidence }) => Confidence > 90);
    const names = workingItems
      .map(({ Name }) => Name)
    .join(' and ')

    console.log(workingItems[1])

    return { names, workingItems };
  }
  async translateText(text) {
    const params = {
      SourceLanguageCode: 'en',
      TargetLanguageCode: 'pt',
      Text: text,
    };
    const { TranslatedText } = await this.translateSvc
      .translateText(params)
      .promise()

    return TranslatedText.split(' e ');
  }

  formatTextResults(texts, workingItems) {
    const finalText = [];
    for (const indexText in texts) {
      const nameInPortuguese = texts[indexText];
      const confidence = workingItems[indexText].Confidence;
      finalText.push(`${confidence.toFixed(2)}% de chance ser do tipo ${nameInPortuguese}`);
    }

    return finalText.join('\n')
  }

  async main(event) {
    try {
      const imgBuffer = await readFile('./img/dog.jpeg');
      console.log('Detecting labels...');
      const result = await this.detectImageLabels(imgBuffer);
      console.log('Translating to portuguese...');
      const texts = await this.translateText(result.names);
      const finalText = this.formatTextResults(texts, result.workingItems);
      console.log(finalText)
      return {
        statusCode: 200,
        body: finalText,
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: 'Internal server error'
      }
    }
  }
}

const aws = require('aws-sdk');
const reko = new aws.Rekognition();
const translate = new aws.Translate()

const handler = new Handler({
  rekoSvc: reko,
  translateSvc: translate,
});

module.exports.main = handler.main.bind(handler);
