package com.cropadvisory.engine;

import com.cropadvisory.dmgt.AgronomyPredicate;
import com.cropadvisory.model.FieldZone;

import java.util.function.Function;

/**
 * AI Subject: Rule representation in the inference engine.
 * Encapsulates IF [condition] THEN [action] agronomic inference rules.
 */
public class AgronomyRule<T> {
    private final String ruleId;
    private final String description;
    private final AgronomyPredicate condition;
    private final Function<FieldZone, T> consequent;

    public AgronomyRule(String ruleId, String description, AgronomyPredicate condition, Function<FieldZone, T> consequent) {
        this.ruleId = ruleId;
        this.description = description;
        this.condition = condition;
        this.consequent = consequent;
    }

    public String getRuleId() { return ruleId; }
    public String getDescription() { return description; }

    public boolean matches(FieldZone zone) {
        return condition.test(zone);
    }

    public T apply(FieldZone zone) {
        return consequent.apply(zone);
    }
}
