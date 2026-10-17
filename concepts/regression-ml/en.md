---
label: Regression
aliases: []
loanwords: []
autolink:
  label: never
plain_descriptions:
  - predicting continuous numerical quantities such as house prices, travel times, or stock values
  - statistical machine learning aimed at estimating a numeric score from multiple input variables
summary: >-
  A supervised machine learning problem formulation where the objective is to predict continuous, real-valued numerical variables based on relationships among input features.
confusable_notes:
  classification-ml: Regression estimates continuous quantities; classification assigns inputs into discrete categories.
follow_up_questions:
  - How does multicollinearity among explanatory features distort regression coefficient estimates?
  - When should mean squared error be favored over mean absolute error in regression loss formulation?
translation: native
---

## Easy explanation
Think of estimating the market selling price of a used bicycle by considering its brand, age in years, and frame condition to arrive at an exact dollar figure.

## Details
Regression algorithms estimate functional relationships between independent explanatory features and continuous dependent target variables. Rather than grouping observations into bins, regression models compute points on continuous mathematical surfaces. Common methodologies include ordinary least squares linear regression, polynomial regression, ridge and lasso regularized estimation, support vector regression (SVR), and gradient-boosted decision trees optimizing mean squared error (MSE) or Huber loss.

## Technical definition
A statistical learning methodology that models conditional expectations of a continuous scalar outcome variable given an observed feature vector.

## Examples
A logistics platform estimates delivery duration for 500 shipments, calculating an expected transit time of 42.5 minutes based on route distance and traffic density.
