# Zombie Spideroid

**October 2026** · Built for Hack-or-Treat 2026

[![Demo video](https://img.shields.io/badge/YouTube-Watch%20the%20demo-red?logo=youtube)](https://www.youtube.com/watch?v=VIDEO_ID)

> Video: https://youtu.be/eyID4pmsm5Y<!-- replace VIDEO_ID -->

## Summary

Zombie Spideroid is a spider-shaped radio companion for a zombie, set in a 1944 outbreak. It receives a Morse transmission, decodes it letter by letter on a retro HUD, then sweeps the room with an ultrasonic sensor mounted on a stepper-driven head. It maps the room, counts the "humans" in it and panics out loud. If there are people nearby, it snaps a webcam crop and broadcasts it as Roboat36 SSTV audio that a phone can decode live.

A local Gemma model writes its lines, and deterministic code decides the facts (contacts, distances, threat level). Every model call has a time cap and a canned fallback, so the demo keeps running even when the model is slow or offline.

## Tech Stack

1. **Python**: state machine, sensor-map contact detection, Morse and SSTV encoding
2. **Arduino (C++)**: Uno firmware driving a 28BYJ-48 stepper, HC-SR04 ultrasonic sensor and joystick over serial
3. **Gemma via Ollama**: on-device LLM for transmissions and scene dialogue, with JSON validation
4. **PySSTV**: encodes webcam face crops as Robot36 SSTV audio for phone decoding
5. **NumPy**: signal generation for Morse tones and audio, plus sensor-reading math
