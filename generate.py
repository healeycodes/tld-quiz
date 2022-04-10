import json
import random

"""
Just a quick script to generate 3000 fake TLDs.

1500 based on common English words (that aren't already TLDs).
1500 based on a Markov chain generator (that aren't already TLDs).
"""


def build_model(source, state_size):
    model = {}
    for i in range(state_size, len(source)):
        current_letter = source[i]
        previous_letter = "".join(source[i - state_size : i])
        if previous_letter in model:
            model[previous_letter].append(current_letter)
        else:
            model[previous_letter] = [current_letter]

    return model


def generate_tld(model, state_size, min_length):
    tld = [random.choice(list(model.keys()))]

    i = state_size
    while True:
        key = "".join(tld[i - state_size : i])

        if key not in model:
            break

        possible_next_states = model[key]
        if len(possible_next_states) == 1 and possible_next_states[0] == "_":
            break

        next_letter = random.choice(model[key])
        tld.append(next_letter)

        if i > min_length:
            if "_" in possible_next_states:
                break

    return "".join(tld)


def generate_tlds(model, state_size, min_length, all_tlds, amount):
    tlds = []

    while True:
        possible_tld = generate_tld(model, state_size, min_length)
        if possible_tld not in all_tlds and "_" not in possible_tld:
            tlds.append(possible_tld)
        if len(tlds) == amount:
            break
    return tlds


TOTAL = 1500
fake_chain_tlds = []
fake_common_tlds = []
without_xn_tlds = []

with open("./real-tld-list.txt") as f:
    lines = f.read().splitlines()
    without_xn_tlds = list(filter(lambda x: x[0:2] != "xn", lines))
    with_end_marker = list(map(lambda x: f"{x}_", without_xn_tlds))
    model = {}
    state_size = 2

    for tld in with_end_marker:
        model = {**model, **build_model(tld, state_size)}

    fake_chain_tlds = (
        generate_tlds(model, 2, 2, set(without_xn_tlds), TOTAL) + fake_chain_tlds
    )

with open("./google-10000-english-no-swears.txt") as f:
    words = f.read().splitlines()
    random.shuffle(words)

    real_tlds = set(without_xn_tlds)
    fake_common_tlds = []

    i = 0
    for word in words:
        if word not in real_tlds:
            fake_common_tlds.append(word)
            i += 1
            if i >= TOTAL:
                break

random.shuffle(fake_chain_tlds)
with open("./fake-markov-chain-tlds.txt", "w") as f:
    f.write("\n".join(fake_chain_tlds))

with open("./fake-common-words-tlds.txt", "w") as f:
    f.write("\n".join(fake_common_tlds))

with open("./app/data/tlds.json", "w") as f:
    tlds = {
        "real": without_xn_tlds,
        "fake_chain_tlds": fake_chain_tlds,
        "fake_common_tlds": fake_common_tlds,
    }
    json.dump(tlds, f)
