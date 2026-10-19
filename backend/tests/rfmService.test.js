import test from 'node:test';
import assert from 'node:assert/strict';
import {classifySegment,actionForSegment} from '../services/rfmService.js';
test('very old customers are classified as inactive',()=>assert.equal(classifySegment(5,5,5,181),'Inactive'));
test('strong RFM scores identify champions',()=>assert.equal(classifySegment(5,5,5,5),'Champions'));
test('segment action exists',()=>assert.match(actionForSegment('At Risk'),/win-back/i));
