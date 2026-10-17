(() => {
  'use strict';
  const cards = Array.isArray(window.FIELDGUIDE_CARDS) ? window.FIELDGUIDE_CARDS : [];
  const root = 'https://github.com/BhagyashriT/java-backend-interview-handbook/blob/main/';
  const $ = id => document.getElementById(id);
  const storeKey = 'fieldguide-revision-v1';
  let saved = {};
  try { saved = JSON.parse(localStorage.getItem(storeKey) || '{}') || {}; } catch (_) { saved = {}; }
  const state = { topic: 'All', query: '', unfinished: false, savedOnly: false, shuffled: false, position: 0, answerVisible: false };
  const persist = () => { try { localStorage.setItem(storeKey, JSON.stringify(saved)); } catch (_) { /* Private browsing can block storage. */ } };
  const filtered = () => {
    let list = cards.filter(c => (state.topic === 'All' || c.topic === state.topic)
      && (!state.unfinished || saved[c.id]?.status !== 'mastered')
      && (!state.savedOnly || saved[c.id]?.favorite)
      && (c.question + ' ' + c.answer + ' ' + c.topic).toLowerCase().includes(state.query));
    if (state.shuffled) list = [...list].sort((a, b) => shuffleRank(a.id) - shuffleRank(b.id));
    return list;
  };
  let shuffleSeed = 1;
  function shuffleRank(id) {
    let h = shuffleSeed;
    for (const ch of id) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
    return h >>> 0;
  }
  function setAnswer(visible) { state.answerVisible = visible; render(); }
  function render() {
    const list = filtered();
    const total = cards.length;
    const mastered = cards.filter(c => saved[c.id]?.status === 'mastered').length;
    $('total-count').textContent = String(total);
    $('mastered-count').textContent = String(mastered);
    $('progress-percent').textContent = Math.round(100 * mastered / Math.max(1, total)) + '%';
    $('progress-fill').style.width = (100 * mastered / Math.max(1, total)) + '%';
    $('deck-name').textContent = state.topic.toUpperCase();
    $('deck-position').textContent = `${list.length === 0 ? 0 : state.position + 1} / ${list.length} questions`;
    $('previous').disabled = list.length === 0;
    $('next').disabled = list.length === 0;
    if (list.length === 0) {
      $('card-topic').textContent = 'NO RESULTS';
      $('card-question').textContent = 'No cards match these filters.';
      $('card-hint').textContent = 'CLEAR SEARCH OR CHOOSE ANOTHER TOPIC';
      $('card-level').textContent = '';
      $('reveal').hidden = true;
      $('grade-buttons').hidden = true;
      $('answer').hidden = true;
      $('bookmark').hidden = true;
      return;
    }
    state.position = (state.position + list.length) % list.length;
    const c = list[state.position];
    $('card-topic').textContent = c.topic.toUpperCase();
    $('card-question').textContent = c.question;
    $('card-level').textContent = c.level === 'advanced' ? 'DEEP DIVE' : 'CORE CONCEPT';
    $('card-hint').textContent = state.answerVisible ? 'ANSWER / EXPLAIN IT IN YOUR OWN WORDS' : 'QUESTION / THINK BEFORE YOU FLIP';
    $('answer-text').textContent = c.answer;
    $('read-more').href = root + encodeURI(c.ref);
    $('answer').hidden = !state.answerVisible;
    $('reveal').hidden = state.answerVisible;
    $('grade-buttons').hidden = !state.answerVisible;
    $('bookmark').hidden = false;
    const isSaved = !!saved[c.id]?.favorite;
    $('bookmark').textContent = isSaved ? '★' : '☆';
    $('bookmark').classList.toggle('saved', isSaved);
    $('bookmark').setAttribute('aria-pressed', String(isSaved));
    $('bookmark').setAttribute('aria-label', isSaved ? 'Unsave question' : 'Save question');
    $('deck-status').textContent = saved[c.id]?.status === 'mastered' ? 'Previously marked as understood ✓' : 'Answer aloud before revealing.';
  }
  function next(direction = 1) {
    const n = filtered().length;
    if (!n) return;
    state.position = (state.position + direction + n) % n;
    state.answerVisible = false;
    render();
  }
  function mark(status) {
    const c = filtered()[state.position]; if (!c) return;
    saved[c.id] = {...saved[c.id], status};
    persist();
    if (state.unfinished && status === 'mastered') {
      state.position = Math.min(state.position, Math.max(0, filtered().length - 1));
      state.answerVisible = false;
      render();
    } else { next(1); }
    $('deck-status').textContent = status === 'mastered' ? 'Marked understood — keep practicing!' : 'Added to your review list.';
  }
  $('topic-pills').addEventListener('click', e => {
    const btn = e.target.closest('button[data-topic]'); if (!btn) return;
    state.topic = btn.dataset.topic;
    state.position = 0; state.answerVisible = false;
    for (const b of $('topic-pills').querySelectorAll('button')) {
      const active = b === btn;
      b.classList.toggle('active', active);
      b.setAttribute('aria-pressed', String(active));
    }
    render();
  });
  $('search').addEventListener('input',e => {state.query=e.target.value.trim().toLowerCase();state.position=0;state.answerVisible=false;render();});
  $('not-mastered').addEventListener('change',e => {state.unfinished=e.target.checked;state.position=0;state.answerVisible=false;render();});
  $('saved-only').addEventListener('change',e => {state.savedOnly=e.target.checked;state.position=0;state.answerVisible=false;render();});
  $('random').addEventListener('click',() => {state.shuffled=!state.shuffled;shuffleSeed=Math.round(Math.random()*1e8)+1;state.position=0;state.answerVisible=false;$('random').textContent=state.shuffled?'⇄ Sorted view':'⇄ Shuffle';render();});
  $('reveal').addEventListener('click',() => setAnswer(true));
  $('got-it').addEventListener('click',() => mark('mastered'));
  $('again').addEventListener('click',() => mark('review'));
  $('next').addEventListener('click',() => next(1));
  $('previous').addEventListener('click',() => next(-1));
  $('bookmark').addEventListener('click',() => {
    const c=filtered()[state.position];if(!c)return;
    saved[c.id]={...saved[c.id],favorite:!saved[c.id]?.favorite};persist();render();
  });
  document.addEventListener('keydown',e => {
    if (e.altKey || e.ctrlKey || e.metaKey || ['INPUT','TEXTAREA','BUTTON'].includes(document.activeElement?.tagName)) return;
    if (e.key === ' ' && !e.repeat) {e.preventDefault();setAnswer(!state.answerVisible);}
    if (e.key === 'ArrowRight') {e.preventDefault();next(1);}
    if (e.key === 'ArrowLeft') {e.preventDefault();next(-1);}
  });
  render();
})();
