package main

import (
	"database/sql"
	"errors"
	"fmt"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	_ "github.com/mattn/go-sqlite3"
)

type MyResponse struct {
	Count int `json:"count"`
}

type CatalogSearchResponse struct {
	Courses []CatalogCourse `json:"courses"`
}

type SocSearchResponse struct {
	Courses []SemesterCourse `json:"courses"`
}

type CatalogCourse struct {
	Id           int    `json:"id"`
	Code         string `json:"code"`
	Name         string `json:"name"`
	Credits      string `json:"credits"`
	Subject      string `json:"subject"`
	Description  string `json:"description"`
	Prerequisite string `json:"prerequisite"`
	Corequisite  string `json:"corequisite"`
}

type SemesterCourse struct {
	Id            int    `json:"id"`
	Name          string `json:"name"`
	Code          string `json:"code"`
	Sections      string `json:"sections"`
	Description   string `json:"description"`
	Prerequisites string `json:"prerequisites"`
}

func ErrorHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Next()

		if len(c.Errors) > 0 {
			err := c.Errors.Last().Err

			log.Println(err.Error())

			c.JSON(c.Writer.Status(), map[string]any{
				"success": false,
				"message": err.Error(),
			})
		}
	}
}

func main() {

	// TODO: refactor
	db, err := sql.Open("sqlite3", "./catalog.db")
	socDb, socDbErr := sql.Open("sqlite3", "./soc.db")

	if err != nil || socDbErr != nil {
		log.Fatal(err, socDbErr)
	}

	defer db.Close()
	defer socDb.Close()

	r := gin.Default()

	r.Use(ErrorHandler())

	r.GET("/ping", func(c *gin.Context) {
		rows, err := db.Query("SELECT COUNT(*) FROM catalog")

		if err != nil {
			log.Fatal(err)
		}

		defer rows.Close()
		var count int
		res := MyResponse{}

		for rows.Next() {
			err = rows.Scan(&res.Count)
			if err != nil {
				log.Fatal(err)
			}
			fmt.Printf("Number of rows are %d\n", count)
		}

		c.JSON(http.StatusOK, res)
	})

	r.GET("/catalog/searchByCode", func(c *gin.Context) {
		code := c.Query("code")

		if code == "" {
			c.AbortWithError(http.StatusBadRequest, errors.New("Course code cannot be empty HAHAHAHA"))
			return
		}

		errorMessage := "Something went wrong while searching for course."

		rows, err := db.Query("SELECT * FROM catalog WHERE code LIKE ?", "%"+code+"%")

		if err != nil {
			c.AbortWithError(http.StatusBadRequest, errors.New(errorMessage))
			return
		}

		defer rows.Close()

		var courses []CatalogCourse

		for rows.Next() {
			var course CatalogCourse

			err = rows.Scan(&course.Id, &course.Code, &course.Name, &course.Credits, &course.Subject, &course.Description, &course.Prerequisite, &course.Corequisite)
			if err != nil {
				c.AbortWithError(http.StatusBadRequest, errors.New(errorMessage))
				return
			}

			courses = append(courses, course)
		}

		if err = rows.Err(); err != nil {
			c.AbortWithError(http.StatusBadRequest, errors.New(errorMessage))
			return
		}

		res := CatalogSearchResponse{
			Courses: courses,
		}

		c.JSON(http.StatusOK, res)
	})

	r.GET("/soc/searchByCode", func(c *gin.Context) {
		code := c.Query("code")

		if code == "" {
			c.AbortWithError(http.StatusBadRequest, errors.New("Course code cannot be empty HAHAHAHA"))
			return
		}

		errorMessage := "Something went wrong while searching for course."

		rows, err := socDb.Query("SELECT * FROM soc WHERE code LIKE ?", "%"+code+"%")

		if err != nil {
			log.Println("select error")
			c.AbortWithError(http.StatusBadRequest, errors.New(errorMessage))
			return
		}

		defer rows.Close()

		var courses []SemesterCourse

		for rows.Next() {
			var course SemesterCourse

			err = rows.Scan(&course.Id, &course.Code, &course.Name, &course.Sections, &course.Description, &course.Prerequisites)
			if err != nil {
				log.Println("scan error")
				c.AbortWithError(http.StatusBadRequest, errors.New(errorMessage))
				return
			}

			courses = append(courses, course)
		}

		if err = rows.Err(); err != nil {
			log.Println("row error")
			c.AbortWithError(http.StatusBadRequest, errors.New(errorMessage))
			return
		}

		res := SocSearchResponse{
			Courses: courses,
		}

		c.JSON(http.StatusOK, res)
	})

	r.Run()
}
